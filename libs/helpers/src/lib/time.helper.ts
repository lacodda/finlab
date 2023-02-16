import { type IDateRange, type IDateRangeISO } from '@finlab/interfaces';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Time {
  public static dayRange(dayISO?: string): IDateRange {
    const date = dayISO ? new Date(dayISO) : new Date();
    return {
      from: new Date(date.setUTCHours(0, 0, 0, 0)),
      to: new Date(date.setUTCHours(23, 59, 59, 999))
    };
  }

  public static dayRangeISO(dayISO?: string): IDateRangeISO {
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
}
