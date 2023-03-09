import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { SummaryResolver } from './summary.resolver';
import { TimestampResolver } from './timestamp.resolver';

@Module({
  providers: [DateScalar, TimestampResolver, SummaryResolver]
})
export class WorkTimeModule {}
