import { IsOptional, IsDate } from 'class-validator';

export class RangeDto {
  @IsOptional()
  @IsDate()
  from?: string;

  @IsOptional()
  @IsDate()
  to?: string;
}
