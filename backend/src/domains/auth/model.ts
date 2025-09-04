import { Model } from 'objection';

export class UserModel extends Model {
  static tableName = 'users';

  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: 'admin' | 'user';

  // This is a virtual attribute that is not stored in the database
  $formatJson(json: any) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}
