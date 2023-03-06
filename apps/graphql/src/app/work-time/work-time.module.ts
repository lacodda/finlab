import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TimestampResolver } from './timestamp.resolver';

@Module({
  providers: [DateScalar, TimestampResolver]
})
export class WorkTimeModule {}
