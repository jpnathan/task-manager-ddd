import Task from "../../../domain/entity/task/task";
import TaskRepository from "../repository/taskRepository";

export default class Create {

	constructor (readonly taskRepositoryDatabase: TaskRepository) {
	}

	async execute(input: Input): Promise<Task> {
        try {
            const {title, content, list} = input;
            const taskEntity = await Task.create(title, content, list);            
			const task = await this.taskRepositoryDatabase.save(taskEntity);
	
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