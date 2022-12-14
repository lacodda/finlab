import { ITask } from '@finlab/interfaces';

export class TaskEntity implements ITask {
  _id?: string;
  userId: string;
  date: Date;
  text: string;
  completeness?: number;

  constructor(task: ITask) {
    this._id = task._id;
    this.userId = task.userId;
    this.date = task.date;
    this.text = task.text;
    this.completeness = task.completeness;
  }

  public updateText(text?: string): this {
    if (text !== undefined) {
      this.text = text;
    }
    return this;
  }

  public updateCompleteness(completeness?: number): this {
    if (completeness !== undefined) {
      this.completeness = completeness;
    }
    return this;
  }

  public get entity(): Omit<ITask, 'userId'> {
    return {
      _id: this._id,
      date: this.date,
      text: this.text,
      completeness: this.completeness
    };
  }
}
