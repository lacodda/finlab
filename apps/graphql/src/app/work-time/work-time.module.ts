import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { CalendarResolver } from './calendar.resolver';
import { SummaryResolver } from './summary.resolver';
import { TaskResolver } from './task.resolver';
import { TimestampResolver } from './timestamp.resolver';

@Module({
  providers: [DateScalar, TimestampResolver, SummaryResolver, TaskResolver, CalendarResolver]
})
export class WorkTimeModule {}
