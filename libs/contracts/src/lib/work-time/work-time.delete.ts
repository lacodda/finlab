import { type IWorkTime } from '@finlab/interfaces';
import { IsString } from 'class-validator';

export namespace WorkTimeDelete {
  export const topic = 'work-time.delete.command';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Pick<IWorkTime, '_id'>;
  }
}
