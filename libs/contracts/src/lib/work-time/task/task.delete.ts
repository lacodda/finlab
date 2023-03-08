import { type ITask } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export const TaskDeleteTopic = 'work-time.task.delete.command';

export class TaskDeleteRequest {
  @IsString()
    id: string;
}

export class TaskDeleteResponse {
  data: Pick<ITask, '_id'>;
}
