import { ITimestamp } from '@finlab/interfaces';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export namespace WorkTimeTimestampGetByQuery {
  export const topic = 'work-time.timestamp-get-by-query.query';

  export class Request {
    @IsString()
      userId: string;

    @IsOptional()
    @IsDateString()
      from?: string;

    @IsOptional()
    @IsDateString()
      to?: string;
  }

  export class Response {
    data: Array<Omit<ITimestamp, 'userId'>>;
  }
}

export class WorkTimeTimestampGetByQueryResponse {
  data: Array<Omit<ITimestamp, 'userId'>>;
}
