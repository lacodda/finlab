import { IWorkTime } from '@finlab/interfaces';
import { IsNumber, IsDateString } from 'class-validator';

export namespace WorkTimeCreate {
  export const topic = 'work-time.create.command';

  export class Request {
    @IsDateString()
      date: string;

    @IsNumber()
      time: number;
  }

  export class Response {
    data: Omit<IWorkTime, 'userId'>;
  }
}
