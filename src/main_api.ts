import * as dotenv from "dotenv";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import Login from "./application/usecase/login";
import Signup from "./application/usecase/signup";
import UserRepositoryDatabase from "./infra/repository/user/UserRepositoryDatabase";
import { SequelizeConnection } from "./infra/sequelize/Connection";
import {ModelsLoader} from "./infra/sequelize/models";
import { UserRoutes } from "./application/api/userRoutes";

dotenv.config();

const { PORT } = process.env || { PORT: 5000};

(async function () {
    
    const sequelizeConnection = new SequelizeConnection();
    const connection = await sequelizeConnection.init();    
    const modelsLoader = new ModelsLoader(connection);
    const models = modelsLoader.createModels();
    const userRepository = new UserRepositoryDatabase(models)

    const signup = new Signup(userRepository);
    const login = new Login(userRepository);
    const userRoutes = new UserRoutes(signup, login);
    const expressApp = new ExpressAdapter(userRoutes.router);


    expressApp.listen(Number(PORT));
})()
