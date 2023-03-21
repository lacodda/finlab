import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { UserId } from '../../common';
import { TaskGetRequest } from './task.get';
import { Task } from './task.model';

export const TaskChangedTopic = 'work-time.task.changed.query';

export class TaskChangedPayload extends UserId {
  @Field(() => Task)
    data: Task;
}

@ArgsType()
export class TaskChangedRequest extends TaskGetRequest {}

export interface TaskChangedUserIdRequest extends UserId, TaskChangedRequest {}
export class TaskChangedUserIdRequest {
  payload: TaskChangedPayload;
}

@ObjectType()
export class TaskChangedResponse {
  @Field(() => [Task])
    data: Task[];
}
