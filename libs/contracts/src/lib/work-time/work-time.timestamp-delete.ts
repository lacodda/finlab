import { type ITimestamp } from '@finlab/interfaces';
import { IsString } from 'class-validator';

export namespace WorkTimeTimestampDelete {
  export const topic = 'work-time.timestamp-delete.command';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Pick<ITimestamp, '_id'>;
  }
}
