import { IWorkTime } from '@finlab/interfaces';
import { IsOptional, IsDate } from 'class-validator';

export namespace WorkTimeGetByQuery {
  export const topic = 'work-time.get-by-query.query';

  export class Request {
    @IsOptional()
    @IsDate()
      from?: string;

    @IsOptional()
    @IsDate()
      to?: string;
  }

  export class Response {
    data: Array<Omit<IWorkTime, 'userId'>>;
  }
}
