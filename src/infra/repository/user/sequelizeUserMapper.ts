import { UID } from "types-ddd";
import { User } from '../../../domain/user/user.entity';

export class SequelizeUserMapper {
  public toEntity(dataValues: { id: UID, email: string, password: string } ) {
    const { id, email, password } = dataValues;
    
    return new User({ id, email, password });
  }

  public toDatabase(survivor: { email: string, password: string }) {
    const { email, password } = survivor;

    return { email, password };
  }
};