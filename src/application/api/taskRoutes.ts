import express, { IRouter, Request, Response } from "express";
import Create from "../usecase/task/create";
import authenticator from "./middleware/auth";
import FindAll from "../usecase/task/findAll";
import Update from "../usecase/task/update";
import Delete from "../usecase/task/delete";

export class TaskRoutes {
    public router: IRouter = express.Router();

    constructor(
        readonly create: Create,
        readonly findAll: FindAll,
        readonly update: Update,
        readonly deleteCard: Delete
    ) {
        this.router.post("/cards", authenticator, async function (req: Request, res: Response) {            
            const output = await create.execute(req.body);
            res.status(201).send(output);
        });

        this.router.get("/cards", authenticator, async function (req: Request, res: Response) {            
            const output = await findAll.execute();
            res.status(201).send(output);
        });

        this.router.put("/cards/:id", authenticator, async function (req: Request, res: Response) {            
            const output = await update.execute(req.params.id, req.body);
            res.status(200).send(output);
        });
    
        this.router.delete("/cards/:id", authenticator, async function (req: Request, res: Response) {            
            const output = await deleteCard.execute(req.params.id);
            res.status(200).send(output);
        });
    }
}