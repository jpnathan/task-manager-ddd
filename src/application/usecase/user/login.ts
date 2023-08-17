import TokenGenerator from "../../../domain/entity/auth/tokenGenerator";
import UserRepository from "../repository/userRepository";

export default class Login {

	constructor (readonly userRepositoryDatabase: UserRepository) {
	}

	async execute(input: Input): Promise<Output> {
		const user = await this.userRepositoryDatabase.get(input.email);

		if (!user) {
			throw new Error("User not found");
		}
		
		const isPasswordValid = await user.validatePassword(input.password);
		console.log(user);
		
		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		const tokenGenerator = new TokenGenerator(process.env.TOKEN_KEY);
		const token = tokenGenerator.generate(user, 1000000);
		return {
			token
		}
	}
}

type Input = {
	email: string,
	password: string
}

type Output = {
	token: string
}