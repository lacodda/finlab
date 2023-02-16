import { type IWorkTime } from '@finlab/interfaces';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export namespace WorkTimeCreate {
  export const topic = 'work-time.create.command';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      date: string;

    @IsNumber()
      time: number;
  }

  export class Response {
    data: Omit<IWorkTime, 'userId'>;
  }
}
