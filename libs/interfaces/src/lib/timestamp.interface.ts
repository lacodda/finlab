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

export interface ITimestampFindByQueryParams {
  userId: string;
  timestamp?: {
    $gte: string;
    $lte: string;
  };
}

export interface ITimestampsResult {
  timestamps: Array<Omit<ITimestamp, 'userId'>>;
  totalTime: number;
}
