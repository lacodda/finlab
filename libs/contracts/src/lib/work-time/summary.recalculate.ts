import { type ISummary } from '@finlab/interfaces/work-time';
import { IsString, IsDateString } from 'class-validator';

export namespace SummaryRecalculate {
  export const topic = 'work-time.summary.recalculate.command';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      from: string;

    @IsDateString()
      to: string;
  }

  export class Response {
    data: Array<Omit<ISummary, 'userId'>>;
  }
}
