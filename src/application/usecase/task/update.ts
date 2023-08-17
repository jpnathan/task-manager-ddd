import Task from "../../../domain/entity/task/task";
import TaskRepository from "../repository/taskRepository";

export default class Update {

	constructor (readonly taskRepositoryDatabase: TaskRepository) {
	}

	async execute(id: string, input: Input): Promise<Task> {
        try {
            const {title, content, list} = input;
            const taskEntity = await Task.create(title, content, list);            
			const task = await this.taskRepositoryDatabase.update(id, taskEntity);
	
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