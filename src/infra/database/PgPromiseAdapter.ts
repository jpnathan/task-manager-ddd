import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromise implements Connection {
	connection: any;

	constructor() {
		const cn = {
			host: 'localhost',
			port: 5432,
			database: process.env.POSTGRES_DB,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			allowExitOnIdle: true
		};
		
		this.connection = pgp()(cn);		
	}

	async query(statement: string, params: any): Promise<any> {		
		return this.connection.query(statement, params);
	}

	async close(): Promise<void> {
		await this.connection.$pool.end();
	}

}
