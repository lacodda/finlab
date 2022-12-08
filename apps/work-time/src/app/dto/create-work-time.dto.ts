import { IsNumber, IsDate } from 'class-validator';

export class CreateWorkTimeDto {
  @IsDate()
    date: string;

  @IsNumber()
    time: number;
}
