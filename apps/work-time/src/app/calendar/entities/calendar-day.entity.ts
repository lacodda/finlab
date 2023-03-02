import { type ICalendarDay, type CalendarType } from '@finlab/interfaces/work-time';

export class CalendarDayEntity implements ICalendarDay {
  userId: string;
  date: Date;
  type: CalendarType;
  time: number;

  constructor(calendarDay: ICalendarDay) {
    this.userId = calendarDay.userId;
    this.date = calendarDay.date;
    this.type = calendarDay.type;
    this.time = calendarDay.time ?? 0;
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
      date: this.date,
      type: this.type,
      time: this.time
    };
  }
}
