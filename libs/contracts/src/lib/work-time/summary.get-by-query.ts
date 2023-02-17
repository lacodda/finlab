import { type ISummary } from '@finlab/interfaces/work-time';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export namespace SummaryGetByQuery {
  export const topic = 'work-time.summary.get-by-query.query';

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
    data: Array<Omit<ISummary, 'userId'>>;
  }
}
