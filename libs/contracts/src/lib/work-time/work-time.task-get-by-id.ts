import { type ITask } from '@finlab/interfaces';
import { IsString } from 'class-validator';

export namespace WorkTimeTaskGetById {
  export const topic = 'work-time.task-get-by-id.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    data: Omit<ITask, 'userId'>;
  }
}
