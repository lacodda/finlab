import { type ITimestamp } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export namespace TimestampGetById {
  export const topic = 'work-time.timestamp.get-by-id.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Omit<ITimestamp, 'userId'>;
  }
}
