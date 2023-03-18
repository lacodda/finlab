import { type Task } from '@finlab/contracts/work-time';
import { Utils } from '@finlab/helpers';
import { type ITask } from '@finlab/interfaces/work-time';

export class TaskEntity implements ITask {
  _id?: string;
  userId: string;
  taskId: string;
  date: Date;
  name: string;
  comment?: string;
  completeness?: number;
  excludedFromSearch?: boolean;

  constructor(task: ITask) {
    this._id = task._id;
    this.userId = task.userId;
    this.taskId = task.taskId || Utils.uuid();
    this.date = task.date;
    this.name = task.name;
    this.comment = task.comment;
    this.completeness = task.completeness;
    this.excludedFromSearch = task.excludedFromSearch;
  }

  public updateName(name?: string): this {
    if (name !== undefined) {
      this.name = name;
    }
    return this;
  }

  public updateComment(comment?: string): this {
    if (comment !== undefined) {
      this.comment = comment;
    }
    return this;
  }

  public updateExcludedFromSearch(excludedFromSearch?: boolean): this {
    if (excludedFromSearch !== undefined) {
      this.excludedFromSearch = excludedFromSearch;
    }
    return this;
  }

  public updateCompleteness(completeness?: number): this {
    if (completeness !== undefined) {
      this.completeness = completeness;
    }
    return this;
  }

  public get entity(): Task {
    return {
      _id: this._id as string,
      taskId: this.taskId,
      date: this.date,
      name: this.name,
      comment: this.comment,
      completeness: this.completeness,
      excludedFromSearch: this.excludedFromSearch
    };
  }
}
