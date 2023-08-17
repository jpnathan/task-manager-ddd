import express, { IRouter, Request, Response } from "express";
import Signup from "../usecase/user/signup";
import Login from "../usecase/user/login";

export class UserRoutes {
    public router: IRouter = express.Router();

    constructor(
        readonly signup: Signup,
        readonly login: Login,  
    ) {
        this.router.post("/signup", async function (req: Request, res: Response) {
            
            const output = await signup.execute(req.body);
            res.status(201).send(output);
        });

        this.router.post("/login", async function (req: Request, res: Response) {
            const { body } = req;
            
			const output = await login.execute(body);
            res.status(200).send(output);
		});
    }
}