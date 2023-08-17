import Email from "./email";
import Password from "./password";

export default class User {

	constructor (readonly email: Email, readonly password: Password) {}

	static async create (email: string, password: string) {
		return new User(new Email(email), await Password.create(password));
	}

	static async buildExistingUser (email: string, hash: string, salt: string) {
		return new User(new Email(email), new Password(hash));
	}

	async validatePassword (password: string) {
		return this.password.validate(password);
	}
}