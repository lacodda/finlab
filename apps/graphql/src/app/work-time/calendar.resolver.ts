import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RMQService } from 'nestjs-rmq';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import {
  Calendar, CalendarGetResponse, CalendarGetRequest, type CalendarGetUserIdRequest, CalendarGetTopic, CalendarCreateResponse,
  CalendarCreateRequest, type CalendarCreateUserIdRequest, CalendarCreateTopic, CalendarDeleteResponse, CalendarDeleteRequest,
  type CalendarDeleteUserIdRequest, CalendarDeleteTopic
} from '@finlab/contracts/work-time';

@Resolver((_of: unknown) => Calendar)
export class CalendarResolver {
  constructor(private readonly rmqService: RMQService) { }

  @Query(_returns => CalendarGetResponse)
  @UseGuards(JwtAuthGuard)
  async calendar(@Args() dto: CalendarGetRequest, @UserId() userId: string): Promise<CalendarGetResponse | undefined> {
    try {
      return await this.rmqService.send<CalendarGetUserIdRequest, CalendarGetResponse>(CalendarGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Mutation(_returns => CalendarCreateResponse)
  @UseGuards(JwtAuthGuard)
  async createCalendarDay(@Args() dto: CalendarCreateRequest, @UserId() userId: string): Promise<CalendarCreateResponse | undefined> {
    try {
      return await this.rmqService.send<CalendarCreateUserIdRequest, CalendarCreateResponse>(CalendarCreateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Mutation(_returns => CalendarDeleteResponse)
  @UseGuards(JwtAuthGuard)
  async deleteCalendarDay(@Args() dto: CalendarDeleteRequest, @UserId() userId: string): Promise<CalendarDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<CalendarDeleteUserIdRequest, CalendarDeleteResponse>(CalendarDeleteTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
