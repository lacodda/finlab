import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import jwtDecode from 'jwt-decode';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import {
  Task, TaskGetResponse, TaskGetRequest, type TaskGetUserIdRequest, TaskGetTopic, TaskCreateResponse, TaskCreateRequest,
  type TaskCreateUserIdRequest, TaskCreateTopic, TaskUpdateResponse, TaskUpdateRequestParam, TaskUpdateRequestBody,
  type TaskUpdateUserIdRequest, TaskUpdateTopic, TaskDeleteResponse, TaskDeleteRequest, type TaskDeleteUserIdRequest, TaskDeleteTopic,
  type TaskChangedPayload, TaskChangedResponse, TaskChangedRequest, TaskChangedTopic, type TaskChangedUserIdRequest
} from '@finlab/contracts/work-time';
import { PUB_SUB } from '../configs/pub-sub.config';
import { type IJwtPayload } from '@finlab/interfaces';
import { type IAuthContext } from '../common/interfaces/auth.interface';

const TASK_CHANGED_EVENT = 'taskChanged';

@Resolver((_of: unknown) => Task)
export class TaskResolver {
  constructor(
    private readonly rmqService: RMQService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub
  ) { }

  @Subscription(_returns => TaskChangedResponse, {
    filter: async function (this: TaskResolver, payload: TaskChangedPayload, dto: TaskChangedRequest, context: IAuthContext) {
      const { id: userId }: IJwtPayload = jwtDecode(context.authorization);
      return await this.rmqService.send<TaskChangedUserIdRequest, boolean>(TaskChangedTopic, { ...dto, userId, payload });
    },
    resolve: async function (this: TaskResolver, _payload, dto: TaskChangedRequest, context) {
      const { id: userId }: IJwtPayload = jwtDecode(context.authorization);
      return await this.rmqService.send<TaskGetUserIdRequest, TaskGetResponse>(TaskGetTopic, { ...dto, userId });
    }
  })
  @UseGuards(JwtAuthGuard)
  taskChanged(@Args() _dto: TaskChangedRequest): unknown {
    return this.pubSub.asyncIterator(TASK_CHANGED_EVENT);
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
      void this.pubSub.publish<TaskChangedPayload>(TASK_CHANGED_EVENT, { ...task, userId });
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
      const task = await this.rmqService.send<TaskUpdateUserIdRequest, TaskUpdateResponse>(TaskUpdateTopic, { ...param, ...body, userId });
      void this.pubSub.publish<TaskChangedPayload>(TASK_CHANGED_EVENT, { ...task, userId });
      return task;
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
      const task = await this.rmqService.send<TaskDeleteUserIdRequest, TaskDeleteResponse>(TaskDeleteTopic, { ...dto, userId });
      void this.pubSub.publish<TaskChangedPayload>(TASK_CHANGED_EVENT, { ...task, userId });
      return task;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
