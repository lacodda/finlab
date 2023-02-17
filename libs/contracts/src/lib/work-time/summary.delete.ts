import { type ISummary } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export namespace SummaryDelete {
  export const topic = 'work-time.summary.delete.command';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Pick<ISummary, '_id'>;
  }
}
