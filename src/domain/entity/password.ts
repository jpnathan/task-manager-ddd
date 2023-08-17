import * as dotenv from "dotenv";
import { pbkdf2 } from "crypto";
import { } from 'jsonwebtoken'
dotenv.config();

export default class Password {
	static ITERATIONS = 100;
	static KEY_LENGTH = 64;
	static DIGEST = "sha512";
	static salt = process.env.JWT_SALT;

	constructor(readonly value: string) {
	}

	static create(password: string): Promise<Password> {
		return new Promise((resolve) => {
			pbkdf2(password, Password.salt, Password.ITERATIONS, this.KEY_LENGTH, this.DIGEST, (error, value) => {
				resolve(new Password(value.toString("hex")));
			});
		});
	}

	public validate(password: string) {
		return new Promise(async (resolve) => {
			const hashPassword = await Password.create(password);

			pbkdf2(
				password,
				Password.salt,
				Password.ITERATIONS,
				Password.KEY_LENGTH,
				Password.DIGEST,
				(error, derivedKey) => {
					if (error) {
						resolve(false);
					} else {
						resolve(hashPassword.value === derivedKey.toString("hex"));
					}
				}
			);
		});
	}
};