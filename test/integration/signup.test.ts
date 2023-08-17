// import Login from "../../src/application/usecase/login";
import Login from "../../src/application/usecase/login";
import Signup from "../../src/application/usecase/signup";
import UserRepositoryDatabase from "../../src/infra/repository/user/UserRepositoryDatabase";
import { SequelizeConnection } from "../../src/infra/sequelize/Connection";
import { ModelsLoader } from "../../src/infra/sequelize/models";

test("user signup", async function () {
	const sequelizeConnection = new SequelizeConnection();
    const connection = await sequelizeConnection.init();    
    const modelsLoader = new ModelsLoader(connection);
    const models = modelsLoader.createModels();
	const userRepository = new UserRepositoryDatabase(models);
	const signup = new Signup(userRepository);
	const input = {
		email: "joao@gmail.com",
		password: "abc123"
	}
	await signup.execute(input);

	const login = new Login(userRepository);
	const output = await login.execute(input);
	console.log(output.token);
	
	expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.nPHGoaoMLLpmDS61-njfqX6G5ZvwT3Y5U71uOXGbRYY");
});
