import TokenGenerator from "../../domain/entity/tokenGenerator";

export default class Verify {

	constructor () {}

	async execute (token: string): Promise<any> {
		const tokenGenerator = new TokenGenerator(process.env.TOKEN_KEY);
		return tokenGenerator.verify(token);
	}
}
