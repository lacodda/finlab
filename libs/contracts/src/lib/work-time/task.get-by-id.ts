import { type ITask } from '@finlab/interfaces/work-time';
import { IsString } from 'class-validator';

export namespace TaskGetById {
  export const topic = 'work-time.task-get-by-id.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Omit<ITask, 'userId'>;
  }
}
