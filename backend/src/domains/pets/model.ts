import { Model } from 'objection';

export class PetModel extends Model {
  static tableName = 'pets';

  id!: number;
  name!: string;
  species!: string;
  breed!: string;
  age!: number;
  photo_url!: string;
  description!: string;
  status!: 'available' | 'pending' | 'adopted';
}
