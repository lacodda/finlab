import { type ISummary } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export namespace SummaryGetById {
  export const topic = 'work-time.summary.get-by-id.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Omit<ISummary, 'userId'>;
  }
}
