import { type ISummary } from '@finlab/interfaces/work-time';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export namespace SummaryDelete {
  export const topic = 'work-time.summary.delete.command';

  export class Request {
    @IsString()
      userId: string;

    @IsOptional()
    @IsString()
      id?: string;

    @IsOptional()
    @IsDateString()
      date?: string;
  }

  export class Response {
    data: Pick<ISummary, '_id'>;
  }
}
