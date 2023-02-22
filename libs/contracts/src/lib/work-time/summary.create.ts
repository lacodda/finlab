import { type ISummary } from '@finlab/interfaces/work-time';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export namespace SummaryCreate {
  export const topic = 'work-time.summary.create.command';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      date: string;

    @IsNumber()
      time: number;
  }

  export class Response {
    data: Omit<ISummary, 'userId'>;
  }
}
