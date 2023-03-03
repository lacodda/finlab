export enum CalendarType {
  WorkingDay = 'WorkingDay',
  Weekend = 'Weekend',
  PaidWeekend = 'PaidWeekend',
  SickLeave = 'SickLeave',
  PaidSickLeave = 'PaidSickLeave',
  BusinessTrip = 'BusinessTrip'
}

export interface ICalendarDay {
  userId: string;
  date: Date;
  type: CalendarType;
  time?: number;
}

export interface ICalendarFindByQueryParams {
  userId: string;
  date?: {
    $gte: Date | string;
    $lte: Date | string;
  };
}
