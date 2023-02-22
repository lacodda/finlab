import { TimestampChangedTotalTime } from '@finlab/contracts/work-time';
import { type IDomainEvent } from '@finlab/interfaces';
import { type ITotalTime } from '@finlab/interfaces/work-time';

export class TotalTimeEntity implements ITotalTime {
  userId: string;
  date: Date;
  time: number;
  events: IDomainEvent[] = [];

  constructor(totalTime: ITotalTime) {
    this.userId = totalTime.userId;
    this.date = totalTime.date;
    this.time = totalTime.time;
    this.events.push({
      topic: TimestampChangedTotalTime.topic,
      data: totalTime
    });
  }
}
