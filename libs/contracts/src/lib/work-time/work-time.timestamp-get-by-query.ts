import { type ITimestamp } from '@finlab/interfaces';
import { IsString, IsOptional, IsDateString, IsBooleanString } from 'class-validator';

export namespace WorkTimeTimestampGetByQuery {
  export const topic = 'work-time.timestamp-get-by-query.query';

  export class Request {
    @IsString()
      userId: string;

    @IsOptional()
    @IsDateString()
      date?: string;

    @IsOptional()
    @IsBooleanString()
      raw?: boolean;
  }

  export class Response {
    data: Array<Omit<ITimestamp, 'userId'>>;
    workTime: number[];
    breaks: number[];
    totalTime: number;
  }
}

export class WorkTimeTimestampGetByQueryResponse {
  data: Array<Omit<ITimestamp, 'userId'>>;
}
