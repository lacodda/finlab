import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';

const PRESET_TIME = new Map(); // FIXME move to settings
PRESET_TIME.set(CalendarType.PaidWeekend, 480);
PRESET_TIME.set(CalendarType.SickLeave, 480);
PRESET_TIME.set(CalendarType.PaidSickLeave, 480);

export class CalendarDayEntity implements ICalendarDay {
  userId: string;
  date: Date;
  type: CalendarType;
  time: number;

  constructor(calendarDay: ICalendarDay) {
    this.userId = calendarDay.userId;
    this.date = calendarDay.date;
    this.type = calendarDay.type;
    this.time = this.calc(calendarDay);
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

  private calc({ time = 0, type }: ICalendarDay): number {
    return (PRESET_TIME.get(type) as number ?? 0) + time;
  }
}
