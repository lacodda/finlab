import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarDay, CalendarSchema } from './models/calendar-day.model';
import { CalendarRepository } from './repositories/calendar.repository';
import { CalendarController } from './calendar.controller';
import { CalendarEventEmitter } from './calendar.event-emitter';
import { CalendarService } from './calendar.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CalendarDay.name, schema: CalendarSchema }
    ])
  ],
  controllers: [CalendarController],
  providers: [CalendarService, CalendarRepository, CalendarEventEmitter],
  exports: [CalendarService, CalendarRepository]
})
export class CalendarModule { }
