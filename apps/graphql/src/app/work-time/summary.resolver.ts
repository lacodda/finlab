import { Args, Query, Resolver } from '@nestjs/graphql';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import { SummaryGetResponse, SummaryGetRequest, type SummaryGetUserIdRequest, SummaryGetTopic, Summary } from '@finlab/contracts/work-time';

@Resolver((_of: unknown) => Summary)
export class SummaryResolver {
  constructor(private readonly rmqService: RMQService) { }

  @Query(_returns => SummaryGetResponse)
  @UseGuards(JwtAuthGuard)
  async summary(@Args() dto: SummaryGetRequest, @UserId() userId: string): Promise<SummaryGetResponse | undefined> {
    try {
      return await this.rmqService.send<SummaryGetUserIdRequest, SummaryGetResponse>(SummaryGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
