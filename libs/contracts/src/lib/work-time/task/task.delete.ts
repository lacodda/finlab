import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { type UserId } from '../../common';
import { Task } from './task.model';

export const TaskDeleteTopic = 'work-time.task.delete.command';

@ArgsType()
export class TaskDeleteRequest {
  @ApiProperty()
  @IsString()
  @Field()
    id: string;
}

export class TaskDeleteUserIdRequest {}
export interface TaskDeleteUserIdRequest extends UserId, TaskDeleteRequest {}

@ObjectType()
export class TaskDeleteResponse {
  @ApiProperty({ type: Task })
  @Field(() => Task)
    data: Task;
}
