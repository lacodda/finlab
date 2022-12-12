import { IWorkTime } from '@finlab/interfaces';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export namespace WorkTimeGetByQuery {
  export const topic = 'work-time.get-by-query.query';

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
    data: Array<Omit<IWorkTime, 'userId'>>;
  }
}
