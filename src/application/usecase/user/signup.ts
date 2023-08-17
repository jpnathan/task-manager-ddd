import User from "../../../domain/entity/user/user";
import UserRepository from "../repository/userRepository";

export default class Signup {

	constructor(readonly userRepositoryDatabase: UserRepository) {}

	async execute(input: Input): Promise<User> {
		try {
			const user = await User.create(input.email, input.password);
			const saveduser = await this.userRepositoryDatabase.save(user);
	
			return saveduser;
	
		} catch (error) {
			console.error(error)
		}
	}
}

type Input = {
	email: string,
	password: string
}
