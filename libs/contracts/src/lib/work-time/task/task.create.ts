import { ArgsType, Field, ObjectType, Int } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsDate, IsInt } from 'class-validator';
import { type UserId } from '../../common';
import { ToBoolean } from '../../decorators';
import { Task } from './task.model';

export const TaskCreateTopic = 'work-time.task.create.command';

@ArgsType()
export class TaskCreateRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
    taskId?: string;

  @ApiProperty()
  @IsDate()
  @Field()
  @Type(() => Date)
    date: Date;

  @ApiProperty()
  @IsString()
  @Field()
    name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
    comment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  @Type(() => Number)
    completeness?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    excludedFromSearch?: boolean;
}

export class TaskCreateUserIdRequest {}
export interface TaskCreateUserIdRequest extends UserId, TaskCreateRequest {}

@ObjectType()
export class TaskCreateResponse {
  @ApiProperty({ type: Task })
  @Field(() => Task)
    data: Task;
}
