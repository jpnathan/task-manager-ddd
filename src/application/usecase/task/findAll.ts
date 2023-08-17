import Task from "../../../domain/entity/task/task";
import TaskRepository from "../repository/taskRepository";

export default class FindAll {

	constructor (readonly taskRepositoryDatabase: TaskRepository) {
	}

	async execute(): Promise<Task[]> {
        try {
			const taskS = await this.taskRepositoryDatabase.findALL();
	
			return taskS;
		} catch (error) {
			console.error(error)
		}
	}
}