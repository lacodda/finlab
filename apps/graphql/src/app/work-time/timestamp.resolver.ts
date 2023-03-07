import { Args, Query, Resolver } from '@nestjs/graphql';
import { Timestamp, TimestampGetByQuery } from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Resolver((_of: unknown) => Timestamp)
export class TimestampResolver {
  constructor(private readonly rmqService: RMQService) { }

  @Query(_returns => TimestampGetByQuery.Response)
  @UseGuards(JwtAuthGuard)
  async getTimestampByQuery(@Args() dto: TimestampGetByQuery.Request, @UserId() userId: string): Promise<TimestampGetByQuery.Response | undefined> {
    try {
      console.log('dto', dto);
      
      return await this.rmqService.send<TimestampGetByQuery.UserIdRequest, TimestampGetByQuery.Response>(TimestampGetByQuery.topic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
