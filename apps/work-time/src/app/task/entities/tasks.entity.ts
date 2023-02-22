import { type ITask, type ITaskFindIncompleteResult } from '@finlab/interfaces/work-time';
import { TaskEntity } from './task.entity';

export class TasksEntity {
  tasks: TaskEntity[] = [];

  constructor(tasks: Array<ITask | ITaskFindIncompleteResult>) {
    this.tasks = tasks.map(task => {
      if (this.instanceOfITaskFindIncompleteResult(task)) {
        return new TaskEntity(task.tasks.find(({ completeness }) => completeness === task.completeness) as ITask);
      }
      return new TaskEntity(task);
    });
  }

  private instanceOfITaskFindIncompleteResult(task: ITask | ITaskFindIncompleteResult): task is ITaskFindIncompleteResult {
    return 'tasks' in task;
  }

  public get entities(): Array<Omit<ITask, 'userId'>> {
    return this.tasks.map(({ entity }) => entity);
  }
}
