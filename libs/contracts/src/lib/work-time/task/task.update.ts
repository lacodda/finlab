import { type ITask } from '@finlab/interfaces/work-time';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export const TaskUpdateTopic = 'work-time.task.update.command';

export class TaskUpdateRequest {
  @IsString()
    id: string;

  @IsOptional()
  @IsString()
    taskId: string;

  @IsOptional()
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

export class TaskUpdateResponse {
  data: Omit<ITask, 'userId'>;
}
