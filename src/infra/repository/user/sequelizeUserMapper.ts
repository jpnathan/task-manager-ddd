import User from "../../../domain/entity/user";
import { DatabaseUser } from "../../../interfaces/user.interface";
import Email from "../../../domain/entity/email";
import Password from "../../../domain/entity/password";

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