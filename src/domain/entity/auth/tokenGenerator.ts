import User from "../user/user";
import { sign, verify } from "jsonwebtoken"; 

export default class TokenGenerator {

	constructor (readonly key: string) {}

	public generate (user: User, expiresIn: number) {
		return sign({ email: user.email.getValue(), iat: new Date().getTime(), expiresIn }, this.key);
	}

	public verify(token: string): any {
		return verify(token, this.key);
	}
}
