import Task from "../../../domain/entity/task/task";
import TaskRepository from "../repository/taskRepository";

export default class Delete {

	constructor (readonly taskRepositoryDatabase: TaskRepository) {
	}

	async execute(id: string): Promise<Task> {
        try {
			const task = await this.taskRepositoryDatabase.remove(id);
	
			return task;
		} catch (error) {
			console.error(error)
		}
	}
}

type Input = {
	title: string,
	content: string
	list: string
}