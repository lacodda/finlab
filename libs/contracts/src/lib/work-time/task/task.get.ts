import { type ITask } from '@finlab/interfaces/work-time';
import { IsString, IsOptional, IsDateString, IsBooleanString } from 'class-validator';

export const TaskGetTopic = 'work-time.task.get.query';

export class TaskGetRequest {
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

export class TaskGetResponse {
  data: Array<Omit<ITask, 'userId'>>;
}
