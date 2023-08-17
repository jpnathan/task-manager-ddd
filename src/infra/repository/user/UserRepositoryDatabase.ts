import { SequelizeUserMapper } from './sequelizeUserMapper';
import User from "../../../domain/entity/user/user";
import UserRepository from "../../../application/usecase/repository/userRepository";

export default class UserRepositoryDatabase implements UserRepository {
	private sequelizeUserMapper = new SequelizeUserMapper();

	constructor(readonly models: any) {
	}
	
	async save(user: User): Promise<User> {
		try {
			const UserModel = this.models.User;
			const data = {email: user.email.getValue(), password: user.password.value}
			const userData = await UserModel.create(data);
			
			return this.sequelizeUserMapper.toEntity(userData);	
		} catch (error) {
			console.log(error);
		}
	}

	async get(email: string): Promise<User> {
		try {
			const UserModel = this.models.User;
			const userData = await UserModel.findOne({ where: { email }, raw: true });
			
			return this.sequelizeUserMapper.toEntity(userData);	
		} catch (error) {
			console.log(error);
		}
	}
}
