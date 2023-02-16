import { type ITimestamp, type TimestampType } from '@finlab/interfaces';

export class TimestampEntity implements ITimestamp {
  _id?: string;
  userId: string;
  timestamp: Date;
  type: TimestampType;

  constructor(timestamp: ITimestamp) {
    this._id = timestamp._id;
    this.userId = timestamp.userId;
    this.timestamp = timestamp.timestamp;
    this.type = timestamp.type;
  }

  public updateType(type: TimestampType): this {
    this.type = type;
    return this;
  }

  public get entity(): Omit<ITimestamp, 'userId'> {
    return {
      _id: this._id,
      timestamp: this.timestamp,
      type: this.type
    };
  }
}
