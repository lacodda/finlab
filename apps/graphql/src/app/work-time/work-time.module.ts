import { Module } from '@nestjs/common';
import { CalendarResolver } from './calendar.resolver';
import { SummaryResolver } from './summary.resolver';
import { TaskResolver } from './task.resolver';
import { TimestampResolver } from './timestamp.resolver';

@Module({
  providers: [TimestampResolver, SummaryResolver, TaskResolver, CalendarResolver]
})
export class WorkTimeModule {}
