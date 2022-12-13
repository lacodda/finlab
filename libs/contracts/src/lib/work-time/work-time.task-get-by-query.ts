import { ITask } from '@finlab/interfaces';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export namespace WorkTimeTaskGetByQuery {
  export const topic = 'work-time.task-get-by-query.query';

  export class Request {
    @IsString()
      userId: string;

    @IsOptional()
    @IsDateString()
      from?: string;

    @IsOptional()
    @IsDateString()
      to?: string;
  }

  export class Response {
    data: Array<Omit<ITask, 'userId'>>;
  }
}
