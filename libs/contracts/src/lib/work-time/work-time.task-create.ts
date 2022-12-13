import { ITask } from '@finlab/interfaces';
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export namespace WorkTimeTaskCreate {
  export const topic = 'work-time.task-create.command';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      date: string;

    @IsString()
      text: string;

    @IsOptional()
    @IsNumber()
      completeness: number;
  }

  export class Response {
    data: Omit<ITask, 'userId'>;
  }
}
