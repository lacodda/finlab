import { type ITask } from '@finlab/interfaces/work-time';
import { IsString, IsOptional, IsDateString, IsBooleanString } from 'class-validator';

export const TaskGetByQueryTopic = 'work-time.task.get-by-query.query';

export class TaskGetByQueryRequest {
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

export class TaskGetByQueryResponse {
  data: Array<Omit<ITask, 'userId'>>;
}
