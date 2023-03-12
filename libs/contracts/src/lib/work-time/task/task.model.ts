import { Field, ObjectType, Int } from '@nestjs/graphql';
import { type ITask } from '@finlab/interfaces/work-time';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Task' })
export class Task implements Omit<ITask, 'userId'> {
  @ApiProperty()
  @Field({ nullable: true })
    _id: string;

  @ApiProperty()
  @Field({ nullable: true })
    taskId: string;

  @ApiProperty()
  @Field({ nullable: true })
    date: Date;

  @ApiProperty()
  @Field({ nullable: true })
    name: string;

  @ApiProperty()
  @Field({ nullable: true })
    comment?: string;

  @ApiProperty()
  @Field(() => Int, { nullable: true })
    completeness?: number;

  @ApiProperty()
  @Field({ nullable: true })
    excludedFromSearch?: boolean;
}
