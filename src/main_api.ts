import * as dotenv from "dotenv";
import { TaskRoutes } from "./application/api/taskRoutes";
import { UserRoutes } from "./application/api/userRoutes";
import Create from "./application/usecase/task/create";
import Login from "./application/usecase/user/login";
import Signup from "./application/usecase/user/signup";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import UserRepositoryDatabase from "./infra/repository/user/UserRepositoryDatabase";
import TaskRepositoryDatabase from "./infra/repository/task/TaskRepositoryDatabase";
import { SequelizeConnection } from "./infra/sequelize/Connection";
import { ModelsLoader } from "./infra/sequelize/models";
import FindAll from "./application/usecase/task/findAll";
import Update from "./application/usecase/task/update";
import Delete from "./application/usecase/task/delete";

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

    const taskRepository = new TaskRepositoryDatabase(models)
    const createCard = new Create(taskRepository);
    const findAllCards = new FindAll(taskRepository);
    const updateCard = new Update(taskRepository);
    const deleteCard = new Delete(taskRepository);
    const taskRoutes = new TaskRoutes(createCard, findAllCards, updateCard, deleteCard);

    const expressApp = new ExpressAdapter([userRoutes.router, taskRoutes.router]);


    expressApp.listen(Number(PORT));
})()
