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

  constructor(calendarDay: Omit<ICalendarDay, 'time'>) {
    this._id = calendarDay._id;
    this.userId = calendarDay.userId;
    this.date = calendarDay.date;
    this.type = calendarDay.type;
    this.time = 0;
    this.events.push({
      topic: CalendarChanged.topic,
      data: calendarDay
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
