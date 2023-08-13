import { UID } from 'types-ddd';
import { DatabaseUser, User } from './../../../interfaces/user.interface';
import { Model } from 'sequelize'

export class UserModel extends Model<User, DatabaseUser> implements DatabaseUser {
    public id!: UID
    public email!: string
    public password: string;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  