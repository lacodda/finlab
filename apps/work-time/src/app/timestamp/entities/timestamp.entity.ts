import { type Timestamp } from '@finlab/contracts/work-time';
import { type ITimestamp, type TimestampType } from '@finlab/interfaces/work-time';

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

  public get entity(): Timestamp {
    return {
      timestamp: this.timestamp,
      type: this.type
    };
  }
}
