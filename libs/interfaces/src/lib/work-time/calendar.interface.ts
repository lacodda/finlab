export enum CalendarType {
  WorkingDay = 'WorkingDay',
  Weekend = 'Weekend',
  PaidWeekend = 'PaidWeekend',
  SickLeave = 'SickLeave',
  PaidSickLeave = 'PaidSickLeave',
  BusinessTrip = 'BusinessTrip'
}

export interface ICalendar {
  _id?: string;
  userId: string;
  date: Date;
  type: CalendarType;
}

export interface ICalendarFindByQueryParams {
  userId: string;
  date?: {
    $gte: Date | string;
    $lte: Date | string;
  };
}

export interface ICalendarsResult {
  dates: Array<Omit<ICalendar, 'userId'>>;
  workTime: number[];
  breaks: number[];
  totalTime: number;
}
