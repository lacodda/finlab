import { type IWorkTime } from '@finlab/interfaces';
import { IsString } from 'class-validator';

export namespace WorkTimeGetById {
  export const topic = 'work-time.get-by-id.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Omit<IWorkTime, 'userId'>;
  }
}
