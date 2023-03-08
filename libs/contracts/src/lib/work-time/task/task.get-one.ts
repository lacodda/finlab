import { type ITask } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export const TaskGetOneTopic = 'work-time.task-get-one.query';

export class TaskGetOneRequest {
  @IsString()
    id: string;
}

export class TaskGetOneResponse {
  data: Omit<ITask, 'userId'>;
}
