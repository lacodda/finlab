import { ITask } from '@finlab/interfaces';
import { IsNumber, IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export namespace WorkTimeTaskCreate {
  export const topic = 'work-time.task-create.command';

  export class Request {
    @IsString()
      userId: string;

    @IsOptional()
    @IsString()
      taskId: string;

    @IsDateString()
      date: string;

    @IsString()
      name: string;

    @IsOptional()
    @IsString()
      comment: string;

    @IsOptional()
    @IsNumber()
      completeness: number;

    @IsOptional()
    @IsBoolean()
      excludedFromSearch: boolean;
  }

  export class Response {
    data: Omit<ITask, 'userId'>;
  }
}
