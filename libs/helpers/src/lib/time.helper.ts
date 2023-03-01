import { type IDateRange, type IDateRangeISO } from '@finlab/interfaces';

export enum FirstDayOfWeek {
  Sunday,
  Monday
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Time {
  public static monthRange(year?: number, month?: number, fillUp = false, firstDayOfWeek: FirstDayOfWeek = FirstDayOfWeek.Monday): Date[] {
    month = month ? month - 1 : new Date().getMonth();
    year = year ?? new Date().getFullYear();
    const daysCountOfFilledUp = 42;
    let daysBefore = 0;
    let daysAfter = 0;
    let start = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    let end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));
    const startWeekDay = start.getUTCDay();

    if (fillUp && startWeekDay !== firstDayOfWeek) {
      daysBefore = startWeekDay > 0 ? startWeekDay - firstDayOfWeek : 6;
      daysAfter = daysCountOfFilledUp - (daysBefore + end.getUTCDate());
      const date = -1 * --daysBefore;
      start = new Date(Date.UTC(year, month, date, 0, 0, 0));
    }

    if (fillUp && daysAfter) {
      end = new Date(Date.UTC(year, month + 1, daysAfter, 23, 59, 59));
    }

    return Time.datesInRange(start, end);
  }

  public static dayRange(dayISO?: Date | string): IDateRange {
    let date = new Date();
    switch (true) {
      case dayISO instanceof Date:
        date = dayISO as Date;
        break;
      case typeof dayISO === 'string':
        date = new Date(dayISO as string);
        break;
      default:
        break;
    }
    return {
      from: new Date(date.setUTCHours(0, 0, 0, 0)),
      to: new Date(date.setUTCHours(23, 59, 59, 999))
    };
  }

  public static dayRangeISO(dayISO?: Date | string): IDateRangeISO {
    const dayRange = Time.dayRange(dayISO);
    return {
      from: dayRange.from.toISOString(),
      to: dayRange.to.toISOString()
    };
  }

  public static diffInMinutes(from: Date, to: Date): number {
    if (!from || !to) {
      return 0;
    }
    let diff = (from.getTime() - to.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  public static datesInRange(from: Date, to: Date): Date[] {
    const dates: Date[] = [];
    let date = new Date(from.getTime());
    while (date <= to) {
      dates.push(new Date(date));
      date = new Date(date.setDate(date.getDate() + 1));
    }

    return dates;
  }
}
