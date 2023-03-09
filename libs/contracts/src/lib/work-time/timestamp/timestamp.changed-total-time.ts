import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { type UserId } from '../../common';

export const TimestampChangedTotalTimeTopic = 'work-time.timestamp.changed-total-time.event';

export class TimestampChangedTotalTimeRequest {
  @IsDate()
  @Type(() => Date)
    date: Date;

  @IsNumber()
    time: number;
}

export class TimestampChangedTotalTimeUserIdRequest {}
export interface TimestampChangedTotalTimeUserIdRequest extends UserId, TimestampChangedTotalTimeRequest {}
