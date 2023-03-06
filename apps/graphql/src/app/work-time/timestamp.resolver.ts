import { Args, Query, Resolver } from '@nestjs/graphql';
import { Timestamp, TimestampGetByQuery } from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../guards/jwt.guard';

@Resolver((_of: unknown) => Timestamp)
export class TimestampResolver {
  constructor(private readonly rmqService: RMQService) { }

  @Query(_returns => TimestampGetByQuery.Response)
  @UseGuards(GqlJwtAuthGuard)
  async getTimestampByQuery(@Args() dto: TimestampGetByQuery.Request): Promise<TimestampGetByQuery.Response | undefined> {
    try {
      return await this.rmqService.send<TimestampGetByQuery.Request, TimestampGetByQuery.Response>(TimestampGetByQuery.topic, { ...dto });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
