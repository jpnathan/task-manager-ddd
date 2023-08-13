import { Request, Response } from "express";
import { boomify } from "@hapi/boom";
import { NextFunction } from "express";
import { RequestError } from "../../../interfaces/errors.interface";

export class ErrorRequestHandler {
  public warmGeneralErrorsHanlder(
    error: RequestError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (
      (error.status && error.status < 500) ||
      (error.statusCode && error.statusCode < 500) ||
      (error.output && error.output.statusCode < 500)
    ) {
      console.warn(error);
    } else {
      console.warn(error);
    }

    next(error);
  }

  public boomifyAllErrors(error: RequestError, req: Request, res: Response) {
    if (!error.output) {
      const boomOpts =
        error.name === "UnauthorizedError"
          ? { statusCode: 401 }
          : { statusCode: error.statusCode };

      boomify(error, boomOpts);
    }

    return res.status(error.output.statusCode).json(error.output.payload);
  }

  public resourceNotFoundHanlder(
    error: RequestError,
    req: Request,
    res: Response
  ) {
    const err = boomify(new Error(), { statusCode: 404 });
    return res.status(error.output.statusCode).json(error.output.payload);
  }
}
