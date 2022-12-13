export enum TimestampType {
  Start = 'Start',
  End = 'End',
  StartBreak = 'StartBreak',
  EndBreak = 'EndBreak'
}

export interface ITimestamp {
  _id?: string;
  userId: string;
  timestamp: Date;
  type: TimestampType;
}
