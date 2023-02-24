export enum CalendarType {
  WorkingDay = 'WorkingDay',
  Weekend = 'Weekend',
  PaidWeekend = 'PaidWeekend',
  SickLeave = 'SickLeave',
  PaidSickLeave = 'PaidSickLeave',
  BusinessTrip = 'BusinessTrip'
}

export interface ICalendarDay {
  _id?: string;
  userId: string;
  date: Date;
  type: CalendarType;
  time: number;
}

export interface ICalendarFindByQueryParams {
  userId: string;
  year?: number;
  month?: number;
  fillUp?: boolean;
}
