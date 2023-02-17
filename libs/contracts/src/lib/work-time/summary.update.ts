import { type ISummary } from '@finlab/interfaces/work-time';
import { IsNumber, IsString } from 'class-validator';

export namespace SummaryUpdate {
  export const topic = 'work-time.summary.update.command';

  export class Request {
    @IsString()
      id: string;

    @IsNumber()
      time: number;
  }

  export class Response {
    data: Omit<ISummary, 'userId'>;
  }
}
