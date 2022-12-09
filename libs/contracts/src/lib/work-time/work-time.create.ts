import { IWorkTime } from '@finlab/interfaces';
import { IsNumber, IsDate } from 'class-validator';

export namespace WorkTimeCreate {
  export const topic = 'work-time.create.command';

  export class Request {
    @IsDate()
      date: string;

    @IsNumber()
      time: number;
  }

  export class Response {
    data: Omit<IWorkTime, 'userId'>;
  }
}
