import { IWorkTime } from '@finlab/interfaces';
import { IsNumber, IsString } from 'class-validator';

export namespace WorkTimeUpdate {
  export const topic = 'work-time.update.command';

  export class Request {
    @IsString()
      id: string;

    @IsNumber()
      time: number;
  }

  export class Response {
    data: Omit<IWorkTime, 'userId'>;
  }
}
