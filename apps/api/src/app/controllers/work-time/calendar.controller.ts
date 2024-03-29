import { Get, Param, Delete, Patch, Query, Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import {
  CalendarCreateRequest, CalendarCreateResponse, CalendarCreateTopic, type CalendarCreateUserIdRequest, CalendarDeleteRequest,
  CalendarDeleteResponse, CalendarDeleteTopic, type CalendarDeleteUserIdRequest, CalendarGetRequest, CalendarGetResponse,
  CalendarGetTopic, type CalendarGetUserIdRequest, CalendarUpdateRequestBody, CalendarUpdateRequestParam, CalendarUpdateResponse,
  CalendarUpdateTopic, type CalendarUpdateUserIdRequest
} from '@finlab/contracts/work-time';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserId } from '../../guards/user.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('work-time/calendar')
export class WorkTimeCalendarController {
  constructor(private readonly rmqService: RMQService) { }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Calendar',
    type: CalendarGetResponse
  })
  async getByQuery(@Query() dto: CalendarGetRequest, @UserId() userId: string): Promise<CalendarGetResponse | undefined> {
    try {
      return await this.rmqService.send<CalendarGetUserIdRequest, CalendarGetResponse>(CalendarGetTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create calendar day',
    type: CalendarCreateResponse
  })
  async create(@Body() dto: CalendarCreateRequest, @UserId() userId: string): Promise<CalendarCreateResponse | undefined> {
    try {
      return await this.rmqService.send<CalendarCreateUserIdRequest, CalendarCreateResponse>(CalendarCreateTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Patch(':date')
  @ApiResponse({
    status: 200,
    description: 'Update calendar day',
    type: CalendarUpdateResponse
  })
  async update(@Param() param: CalendarUpdateRequestParam, @Body() body: CalendarUpdateRequestBody, @UserId() userId: string): Promise<CalendarUpdateResponse | undefined> {
    try {
      return await this.rmqService.send<CalendarUpdateUserIdRequest, CalendarUpdateResponse>(CalendarUpdateTopic, { ...param, ...body, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiTags('calendar')
  @UseGuards(JwtAuthGuard)
  @Delete(':date')
  @ApiResponse({
    status: 200,
    description: 'Delete calendar day',
    type: CalendarDeleteResponse
  })
  async delete(@Param() dto: CalendarDeleteRequest, @UserId() userId: string): Promise<CalendarDeleteResponse | undefined> {
    try {
      return await this.rmqService.send<CalendarDeleteUserIdRequest, CalendarDeleteResponse>(CalendarDeleteTopic, { ...dto, userId });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
