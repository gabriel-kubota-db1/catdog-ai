import { Model, RelationMappings } from 'objection';
import { UserModel } from '../auth/model.js';
import { PetModel } from '../pets/model.js';

export class AdoptionRequestModel extends Model {
  static tableName = 'adoption_requests';

  id!: number;
  user_id!: number;
  pet_id!: number;
  status!: 'pending' | 'approved' | 'denied';

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'adoption_requests.user_id',
        to: 'users.id',
      },
    },
    pet: {
      relation: Model.BelongsToOneRelation,
      modelClass: PetModel,
      join: {
        from: 'adoption_requests.pet_id',
        to: 'pets.id',
      },
    },
  };
}
