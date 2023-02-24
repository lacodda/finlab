import { CalendarChanged } from '@finlab/contracts/work-time';
import { type IDomainEvent } from '@finlab/interfaces';
import { type ICalendarDay, type CalendarType } from '@finlab/interfaces/work-time';

export class CalendarDayEntity implements ICalendarDay {
  _id?: string;
  userId: string;
  date: Date;
  type: CalendarType;
  time: number;
  events: IDomainEvent[] = [];

  constructor(calendar: Omit<ICalendarDay, 'time'>) {
    this._id = calendar._id;
    this.userId = calendar.userId;
    this.date = calendar.date;
    this.type = calendar.type;
    this.time = 0;
    this.events.push({
      topic: CalendarChanged.topic,
      data: calendar
    });
  }

  public updateType(type: CalendarType): this {
    this.type = type;
    return this;
  }

  public updateTime(time: number): this {
    this.time = time;
    return this;
  }

  public get entity(): Omit<ICalendarDay, 'userId'> {
    return {
      _id: this._id,
      date: this.date,
      type: this.type,
      time: this.time
    };
  }
}
