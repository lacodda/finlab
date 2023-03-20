import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import {
  Task, TaskGetResponse, TaskGetRequest, type TaskGetUserIdRequest, TaskGetTopic, TaskCreateResponse, TaskCreateRequest,
  type TaskCreateUserIdRequest, TaskCreateTopic, TaskUpdateResponse, TaskUpdateRequestParam, TaskUpdateRequestBody,
  type TaskUpdateUserIdRequest, TaskUpdateTopic, TaskDeleteResponse, TaskDeleteRequest, type TaskDeleteUserIdRequest, TaskDeleteTopic
} from '@finlab/contracts/work-time';
import { PUB_SUB } from '../configs/pub-sub.config';

const TASK_ADDED_EVENT = 'taskAdded';

@Resolver((_of: unknown) => Task)
export class TaskResolver {
  constructor(
    private readonly rmqService: RMQService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub
  ) { }

  @Subscription(_returns => TaskCreateResponse)
  taskAdded(): unknown {
    return this.pubSub.asyncIterator(TASK_ADDED_EVENT);
  }

  @Query(_returns => TaskGetResponse)
  @UseGuards(JwtAuthGuard)
  async tasks(@Args() dto: TaskGetRequest, @UserId() userId: string): Promise<TaskGetResponse | undefined> {
    try {
      return await this.rmqService.send<TaskGetUserIdRequest, TaskGetResponse>(TaskGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Mutation(_returns => TaskCreateResponse)
  @UseGuards(JwtAuthGuard)
  async createTask(@Args() dto: TaskCreateRequest, @UserId() userId: string): Promise<TaskCreateResponse | undefined> {
    try {
      const task = await this.rmqService.send<TaskCreateUserIdRequest, TaskCreateResponse>(TaskCreateTopic, { ...dto, userId });
      void this.pubSub.publish(TASK_ADDED_EVENT, { taskAdded: task });
      return task;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Mutation(_returns => TaskUpdateResponse)
  @UseGuards(JwtAuthGuard)
  async updateTask(@Args() param: TaskUpdateRequestParam, @Args() body: TaskUpdateRequestBody, @UserId() userId: string): Promise<TaskUpdateResponse | undefined> {
    try {
      return await this.rmqService.send<TaskUpdateUserIdRequest, TaskUpdateResponse>(TaskUpdateTopic, { ...param, ...body, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Mutation(_returns => TaskDeleteResponse)
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Args() dto: TaskDeleteRequest, @UserId() userId: string): Promise<TaskDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<TaskDeleteUserIdRequest, TaskDeleteResponse>(TaskDeleteTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
