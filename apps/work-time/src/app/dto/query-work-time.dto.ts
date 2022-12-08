import { IsOptional, IsDate } from 'class-validator';

export class QueryWorkTimeDto {
  @IsOptional()
  @IsDate()
    from?: string;

  @IsOptional()
  @IsDate()
    to?: string;
}
