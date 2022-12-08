import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  Res,
  Version
} from '@nestjs/common';
import { Response } from 'express';
import { WorkTimeService } from './work-time.service';
import { CreateWorkTimeDto, UpdateWorkTimeDto, RangeDto } from './dto';

@Controller('work-time')
export class WorkTimeController {
  constructor(private readonly workTimeService: WorkTimeService) {}

  @Version('1')
  @Post()
  async create(@Body() dto: CreateWorkTimeDto, @Res() res: Response) {
    const newWorkTime = await this.workTimeService.create(dto);
    return res.status(HttpStatus.OK).send(newWorkTime);
  }

  @Version('1')
  @Get()
  async findAll(@Query() dto: RangeDto, @Res() res: Response) {
    const storages = await this.workTimeService.findAll(dto);
    return res.status(HttpStatus.OK).send(storages);
  }

  @Version('1')
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const storage = await this.workTimeService.findOne(id);
    return res.status(HttpStatus.OK).send(storage);
  }

  @Version('1')
  @Patch(':id')
  async update(
  @Param('id') id: string,
    @Body() dto: UpdateWorkTimeDto,
    @Res() res: Response
  ) {
    const updatedWorkTime = await this.workTimeService.update(id, dto);
    return res.status(HttpStatus.OK).send(updatedWorkTime);
  }

  @Version('1')
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const removedWorkTime = await this.workTimeService.remove(id);
    return res.status(HttpStatus.OK).send(removedWorkTime);
  }
}
