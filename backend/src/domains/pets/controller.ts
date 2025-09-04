import { Request, Response } from 'express';
import { PetModel } from './model.js';
import { petSchema } from './validators.js';

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await PetModel.query();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pets.' });
  }
};

export const getPetById = async (req: Request, res: Response) => {
  try {
    const pet = await PetModel.query().findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found.' });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pet.' });
  }
};

export const createPet = async (req: Request, res: Response) => {
  const { error } = petSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newPet = await PetModel.query().insert(req.body);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create pet.' });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  const { error } = petSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedPet = await PetModel.query().patchAndFetchById(req.params.id, req.body);
    if (!updatedPet) return res.status(404).json({ message: 'Pet not found.' });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update pet.' });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    const numDeleted = await PetModel.query().deleteById(req.params.id);
    if (numDeleted === 0) return res.status(404).json({ message: 'Pet not found.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete pet.' });
  }
};
