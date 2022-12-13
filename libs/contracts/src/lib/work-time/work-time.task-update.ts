import { ITask } from '@finlab/interfaces';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export namespace WorkTimeTaskUpdate {
  export const topic = 'work-time.task-update.command';

  export class Request {
    @IsString()
      id: string;

    @IsOptional()
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
