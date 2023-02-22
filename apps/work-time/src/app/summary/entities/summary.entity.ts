import { type ISummary } from '@finlab/interfaces/work-time';

export class SummaryEntity implements ISummary {
  _id?: string;
  userId: string;
  date: Date;
  time: number;

  constructor(summary: ISummary) {
    this._id = summary._id;
    this.userId = summary.userId;
    this.date = summary.date;
    this.time = summary.time;
  }

  public updateTime(time: number): this {
    this.time = time;
    return this;
  }

  public get entity(): Omit<ISummary, 'userId'> {
    return {
      _id: this._id,
      date: this.date,
      time: this.time
    };
  }
}
