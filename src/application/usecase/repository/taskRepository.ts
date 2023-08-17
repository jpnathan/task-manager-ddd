import { UUID } from "crypto";
import Task from "../../../domain/entity/task/task";

export default interface TaskRepository {
	save (task: Task): Promise<Task>;
	get(id: UUID): Promise<Task>;
	findALL(): Promise<Task[]>;
	update(id: string, task: Task): Promise<Task>;
	remove(id: string): Promise<Task>;
}
