import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsBoolean, IsDate } from 'class-validator';
import { type UserId } from '../../common';
import { ToBoolean } from '../../decorators';
import { Task } from './task.model';

export const TaskGetTopic = 'work-time.task.get.query';

@ArgsType()
export class TaskGetRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    from?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  @Type(() => Date)
    to?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    incomplete?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  @ToBoolean()
    includeAll?: boolean;
}

export class TaskGetUserIdRequest {}
export interface TaskGetUserIdRequest extends UserId, TaskGetRequest {}

@ObjectType()
export class TaskGetResponse {
  @ApiProperty({ type: [Task] })
  @Field(() => [Task])
    data: Task[];
}
