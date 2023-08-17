import { SequelizeTaskMapper } from './sequelizeTaskMapper';
import Task from "../../../domain/entity/task/task";
import TaskRepository from '../../../application/usecase/repository/taskRepository';

export default class TaskRepositoryDatabase implements TaskRepository {
	private sequelizeTaskMapper = new SequelizeTaskMapper();

	constructor(readonly models: any) {
	}
	
	async save(task: Task): Promise<Task> {
		try {
            const TaskModel = this.models.Task;
            console.log(task);
            
			const taskData = await TaskModel.create(task);
			
			return this.sequelizeTaskMapper.toEntity(taskData);	
		} catch (error) {
			console.log(error);
		}
	}

	async get(id: string): Promise<Task> {
		try {
			const TaskModel = this.models.User;
			const task = await TaskModel.findOne({ where: { id }, raw: true });
			
			return this.sequelizeTaskMapper.toDatabase(task);	
		} catch (error) {
			console.log(error);
		}
    }
    
    async findALL(): Promise<Task[]> {
        try {
            const TaskModel = this.models.Task;
            const tasks = await TaskModel.findAll({ raw: true });
            
            return tasks.map(task => this.sequelizeTaskMapper.toDatabase(task));
        } catch (error) {
            console.log(error);
        }
    }

    async update(id: string, task: Task): Promise<Task> {
        try {
            const TaskModel = this.models.Task;
            const taskInDatabase = await TaskModel.findOne({ where: { id } }, { raw: true });

            if (!taskInDatabase) {
                throw new Error('Task not found');
            }

            const dataToUpdate = {...taskInDatabase, ...task};
            await TaskModel.update(dataToUpdate, { where: { id } });
            
            return this.sequelizeTaskMapper.toDatabase(dataToUpdate);            
        } catch (error) {
            console.log(error);
        }
    }

    async remove(id: string): Promise<Task> {
        try {
            const TaskModel = this.models.Task;
            const taskInDatabase = await TaskModel.findOne({ where: { id } }, { raw: true });

            if (!taskInDatabase) {
                throw new Error('Task not found');
            }

            const deleted = await TaskModel.destroy({ where: { id }, returning: true });

            return this.sequelizeTaskMapper.toDatabase(deleted);            
        } catch (error) {
            console.log(error);
        }
    }

}
