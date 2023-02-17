import { type ITask } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export namespace TaskDelete {
  export const topic = 'work-time.task.delete.command';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Pick<ITask, '_id'>;
  }
}
