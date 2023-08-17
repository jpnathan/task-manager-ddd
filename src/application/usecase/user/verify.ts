import TokenGenerator from "../../domain/entity/auth/tokenGenerator";

export default class Verify {

	constructor () {}

	async execute (token: string): Promise<any> {
		const tokenGenerator = new TokenGenerator(process.env.TOKEN_KEY);
		return tokenGenerator.verify(token);
	}
}
