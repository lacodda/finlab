import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Timestamp, TimestampCreateRequest, TimestampCreateResponse, TimestampCreateTopic, type TimestampCreateUserIdRequest,
  TimestampGetByQueryRequest, TimestampGetByQueryResponse, TimestampGetByQueryTopic, type TimestampGetByQueryUserIdRequest
} from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Resolver((_of: unknown) => Timestamp)
export class TimestampResolver {
  constructor(private readonly rmqService: RMQService) { }

  @Query(_returns => TimestampGetByQueryResponse)
  @UseGuards(JwtAuthGuard)
  async getTimestampByQuery(@Args() dto: TimestampGetByQueryRequest, @UserId() userId: string): Promise<TimestampGetByQueryResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampGetByQueryUserIdRequest, TimestampGetByQueryResponse>(TimestampGetByQueryTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Mutation(_returns => TimestampCreateResponse)
  @UseGuards(JwtAuthGuard)
  async createTimestamp(@Args() dto: TimestampCreateRequest, @UserId() userId: string): Promise<TimestampCreateResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampCreateUserIdRequest, TimestampCreateResponse>(TimestampCreateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
