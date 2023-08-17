import Task from "../../../domain/entity/task/task";
import { Task as ITask } from "../../../interfaces/task.interface";

export class SequelizeTaskMapper {

  public async toEntity(dataValues: ITask) {
    const { title, content, list } = dataValues;

    return new Task(title, content, list);
  }

  public toDatabase(survivor: ITask) {
    const { title, content, list } = survivor;
    
    return { title, content, list };
  }
};