import { Entity, Fail, Ok, Result } from 'types-ddd';
import { User as IUser, DatabaseUser } from "../../interfaces/user.interface";

export class User extends Entity<DatabaseUser> {
  constructor(user: DatabaseUser) {
    super(user);
  }

  public static create(props: IUser): Result<DatabaseUser> {
    const isValid = props.password === props.confirmPassword;
    
    if (!isValid) {
      return Fail("Passwords are not equal");
    }

    return Ok(new User(props));
  }
}