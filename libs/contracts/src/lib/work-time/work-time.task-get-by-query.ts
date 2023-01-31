import { ITask } from '@finlab/interfaces';
import { IsString, IsOptional, IsDateString, IsBooleanString } from 'class-validator';

export namespace WorkTimeTaskGetByQuery {
  export const topic = 'work-time.task-get-by-query.query';

  export class Request {
    @IsString()
      userId: string;

    @IsDateString()
      from: string;

    @IsDateString()
      to: string;

    @IsOptional()
    @IsBooleanString()
      incomplete: boolean;

    @IsOptional()
    @IsBooleanString()
      includeAll: boolean;
  }

  export class Response {
    data: Array<Omit<ITask, 'userId'>>;
  }
}
