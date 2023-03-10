import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Timestamp, TimestampCreateRequest, TimestampCreateResponse, TimestampCreateTopic, type TimestampCreateUserIdRequest,
  TimestampGetRequest, TimestampGetResponse, TimestampGetTopic, type TimestampGetUserIdRequest, TimestampDeleteRequest,
  TimestampDeleteResponse, TimestampDeleteTopic, type TimestampDeleteUserIdRequest
} from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Resolver((_of: unknown) => Timestamp)
export class TimestampResolver {
  constructor(private readonly rmqService: RMQService) { }

  @Query(_returns => TimestampGetResponse)
  @UseGuards(JwtAuthGuard)
  async timestamps(@Args() dto: TimestampGetRequest, @UserId() userId: string): Promise<TimestampGetResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampGetUserIdRequest, TimestampGetResponse>(TimestampGetTopic, { ...dto, userId });
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

  @Mutation(_returns => TimestampDeleteResponse)
  @UseGuards(JwtAuthGuard)
  async deleteTimestamp(@Args() dto: TimestampDeleteRequest, @UserId() userId: string): Promise<TimestampDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<TimestampDeleteUserIdRequest, TimestampDeleteResponse>(TimestampDeleteTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
