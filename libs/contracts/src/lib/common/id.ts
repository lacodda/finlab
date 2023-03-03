import { IsString } from 'class-validator';

export class Id {
  @IsString()
    id: string;
}
