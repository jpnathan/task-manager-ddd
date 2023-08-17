import express, { IRouter, Request, Response } from "express";
import cors from "cors";

export default class ExpressAdapter {
	app: any;

	constructor (routes: IRouter) {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use('/', routes)
	}

	listen(port: number): void {
		try {
			this.app.listen(port);
			console.log("Server is listening on port: " + port);
		} catch (error) {
			throw error;
		}
		
	}

}