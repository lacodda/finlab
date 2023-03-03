import { FirstDayOfWeek, type IDateRange, type IDateRangeISO } from '@finlab/interfaces';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Time {
  public static dayRange(dayISO?: Date | string): IDateRange {
    let date = new Date();
    switch (true) {
      case dayISO instanceof Date:
        date = new Date(dayISO as Date);
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

  public static monthRange(year?: number, month?: number): IDateRange {
    month = month ? month - 1 : new Date().getUTCMonth();
    year = year ?? new Date().getUTCFullYear();
    return {
      from: new Date(Date.UTC(year, month, 1, 0, 0, 0)),
      to: new Date(Date.UTC(year, month + 1, 0, 23, 59, 59))
    };
  }

  public static monthRangeISO(year?: number, month?: number): IDateRangeISO {
    const monthRange = Time.monthRange(year, month);
    return {
      from: monthRange.from.toISOString(),
      to: monthRange.to.toISOString()
    };
  }

  public static yearRange(year?: number): IDateRange {
    year = year ?? new Date().getUTCFullYear();
    return {
      from: new Date(Date.UTC(year, 1, 1, 0, 0, 0)),
      to: new Date(Date.UTC(year, 12, 0, 23, 59, 59))
    };
  }

  public static yearRangeISO(year?: number): IDateRangeISO {
    const yearRange = Time.yearRange(year);
    return {
      from: yearRange.from.toISOString(),
      to: yearRange.to.toISOString()
    };
  }

  public static datesInMonthRange(year?: number, month?: number, fillUp = false, firstDayOfWeek: FirstDayOfWeek = FirstDayOfWeek.Monday): Date[] {
    const daysCountOfFilledUp = 42;
    let { from, to } = Time.monthRange(year, month);
    let daysBefore = 0;
    let daysAfter = 0;
    year = from.getUTCFullYear();
    month = from.getUTCMonth();
    const startWeekDay = from.getUTCDay();
    if (fillUp && startWeekDay !== firstDayOfWeek) {
      daysBefore = startWeekDay > 0 ? startWeekDay - firstDayOfWeek : 6;
      daysAfter = daysCountOfFilledUp - (daysBefore + to.getUTCDate());
      const date = -1 * --daysBefore;
      from = new Date(Date.UTC(year, month, date, 0, 0, 0));
    }
    if (fillUp && daysAfter) {
      to = new Date(Date.UTC(year, month + 1, daysAfter, 23, 59, 59));
    }
    return Time.datesInRange(from, to);
  }

  public static datesInYearRange(year?: number): Date[] {
    const { from, to } = Time.yearRange(year);
    return Time.datesInRange(from, to);
  }

  public static datesInRange(from: Date, to: Date): Date[] {
    const dates: Date[] = [];
    let date = Time.dayRange(from).from;
    while (date <= to) {
      dates.push(new Date(date));
      date = new Date(date.setUTCDate(date.getUTCDate() + 1));
    }
    return dates;
  }

  public static isSameDay(first: Date | string, second: Date | string): boolean {
    return Time.dayRange(first).from.getTime() === Time.dayRange(second).from.getTime();
  }

  public static isWeekend(date: Date): boolean {
    return [0, 6].includes(date.getUTCDay());
  }

  public static diffInMinutes(from: Date, to: Date): number {
    if (!from || !to) {
      return 0;
    }
    let diff = (from.getTime() - to.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }
}
