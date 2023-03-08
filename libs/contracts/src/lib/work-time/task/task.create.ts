import { type ITask } from '@finlab/interfaces/work-time';
import { IsNumber, IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export const TaskCreateTopic = 'work-time.task.create.command';

export class TaskCreateRequest {
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

export class TaskCreateResponse {
  data: Omit<ITask, 'userId'>;
}
