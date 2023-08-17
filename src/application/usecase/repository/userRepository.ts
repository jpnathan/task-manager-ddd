import User from "../../../domain/entity/user/user";

export default interface UserRepository {
	save (user: User): Promise<User>;
	get (email: string): Promise<User>;
}
