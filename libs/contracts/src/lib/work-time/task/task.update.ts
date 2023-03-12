import { ArgsType, Field, ObjectType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { type UserId } from '../../common';
import { ToBoolean } from '../../decorators';
import { Task } from './task.model';

export const TaskUpdateTopic = 'work-time.task.update.command';

@ArgsType()
export class TaskUpdateRequestParam {
  @ApiProperty()
  @IsString()
  @Field()
    id: string;
}

@ArgsType()
export class TaskUpdateRequestBody {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
    taskId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
    name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
    comment?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  @Type(() => Number)
    completeness?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    excludedFromSearch?: boolean;
}

export class TaskUpdateUserIdRequest {}
export interface TaskUpdateUserIdRequest extends UserId, TaskUpdateRequestParam, TaskUpdateRequestBody {}

@ObjectType()
export class TaskUpdateResponse {
  @ApiProperty({ type: Task })
  @Field(() => Task)
    data: Task;
}
