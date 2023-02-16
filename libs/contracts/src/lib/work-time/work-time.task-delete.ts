import { type ITask } from '@finlab/interfaces';
import { IsString } from 'class-validator';

export namespace WorkTimeTaskDelete {
  export const topic = 'work-time.task-delete.command';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Pick<ITask, '_id'>;
  }
}
