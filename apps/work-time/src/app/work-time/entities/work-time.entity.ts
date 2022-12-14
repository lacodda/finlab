import { IWorkTime } from '@finlab/interfaces';

export class WorkTimeEntity implements IWorkTime {
  _id?: string;
  userId: string;
  date: Date;
  time: number;

  constructor(workTime: IWorkTime) {
    this._id = workTime._id;
    this.userId = workTime.userId;
    this.date = workTime.date;
    this.time = workTime.time;
  }

  public updateTime(time: number): this {
    this.time = time;
    return this;
  }

  public get entity(): Omit<IWorkTime, 'userId'> {
    return {
      _id: this._id,
      date: this.date,
      time: this.time
    };
  }
}
