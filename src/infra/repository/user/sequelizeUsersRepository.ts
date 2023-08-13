import { UserModel } from './../../database/models/user.model';
import { UID } from "types-ddd";

class SequelizeUsersRepository {
    constructor(private readonly UserModel: UserModel = new UserModel()) {
  }

  async getById(id: UID) {
    try {
        return await this.UserModel.findById(id, { rejectOnEmpty: true });
      } catch(error) {
        if(error.name === 'SequelizeEmptyResultError') {
          const notFoundError = new Error('NotFoundError');
          notFoundError['details'] = `User with id ${id} can't be found.`;
  
          throw notFoundError;
        }
  
        throw error;
      }
  
    return this.UserMapper.toEntity(user);
  }

  async add(user: User) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error['details'] = errors;

      throw error;
    }

    const newUser = await this.UserModel.create(this.UserMapper.toDatabase(user));
    return this.UserMapper.toEntity(newUser);
  }

  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
  }
}

module.exports = SequelizeUsersRepository;