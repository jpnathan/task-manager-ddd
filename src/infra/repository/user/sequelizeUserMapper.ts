import Email from "../../../domain/entity/user/email";
import Password from "../../../domain/entity/user/password";
import User from "../../../domain/entity/user/user";
import { DatabaseUser } from "../../../interfaces/user.interface";

export class SequelizeUserMapper {

  public async toEntity(dataValues: DatabaseUser ) {
    const email = new Email(dataValues.email);
    const password = await Password.create(dataValues.password);
    
    return new User(email, password);
  }

  public toDatabase(survivor: User) {
    const { email, password } = survivor;
    
    return { email, password };
  }
};