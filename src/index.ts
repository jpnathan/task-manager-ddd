import express from 'express';
import cors from 'cors';
import { ErrorRequestHandler } from './infra/api/handlers/errors';

const errorHandler = new ErrorRequestHandler();
const app = express();
const port = process.env.PORT || '5000';

app.use(cors)
app.use(express.json());
app.use(errorHandler.warmGeneralErrorsHanlder)
app.use(errorHandler.boomifyAllErrors)
app.use(errorHandler.resourceNotFoundHanlder)

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});