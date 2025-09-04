import { Response } from 'express';
import { AdoptionRequestModel } from './model.js';
import { PetModel } from '../pets/model.js';
import { createRequestSchema, updateStatusSchema } from './validators.js';
import { AuthRequest } from '../../middlewares/isAuthenticated.js';
import { transaction } from 'objection';

export const getAllRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await AdoptionRequestModel.query().withGraphFetched('[user, pet]');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch adoption requests.' });
  }
};

export const createRequest = async (req: AuthRequest, res: Response) => {
  const { error } = createRequestSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { pet_id } = req.body;
  const user_id = req.user!.id;

  try {
    const pet = await PetModel.query().findById(pet_id);
    if (!pet || pet.status !== 'available') {
      return res.status(400).json({ message: 'This pet is not available for adoption.' });
    }

    const existingRequest = await AdoptionRequestModel.query().findOne({ user_id, pet_id });
    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested to adopt this pet.' });
    }

    const newRequest = await AdoptionRequestModel.query().insert({ user_id, pet_id });
    await PetModel.query().findById(pet_id).patch({ status: 'pending' });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create adoption request.' });
  }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  const { error } = updateStatusSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { status } = req.body;
  const { id } = req.params;

  try {
    const trx = await transaction.start(AdoptionRequestModel.knex());

    const request = await AdoptionRequestModel.query(trx).findById(id);
    if (!request) {
      await trx.rollback();
      return res.status(404).json({ message: 'Adoption request not found.' });
    }

    if (request.status !== 'pending') {
      await trx.rollback();
      return res.status(400).json({ message: 'This request has already been processed.' });
    }

    await request.$query(trx).patch({ status });

    if (status === 'approved') {
      await PetModel.query(trx).findById(request.pet_id).patch({ status: 'adopted' });
      // Deny all other pending requests for this pet
      await AdoptionRequestModel.query(trx)
        .where('pet_id', request.pet_id)
        .andWhere('status', 'pending')
        .patch({ status: 'denied' });
    } else if (status === 'denied') {
      // If no other pending requests, set pet back to available
      const otherPendingRequests = await AdoptionRequestModel.query(trx)
        .where('pet_id', request.pet_id)
        .andWhere('status', 'pending')
        .resultSize();
      
      if (otherPendingRequests === 0) {
        await PetModel.query(trx).findById(request.pet_id).patch({ status: 'available' });
      }
    }

    await trx.commit();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update adoption request status.' });
  }
};
