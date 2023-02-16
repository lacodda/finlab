import { IsString } from 'class-validator';
import { type IUser } from '@finlab/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export namespace AccountUserInfo {
  export const topic = 'account.user-info.query';

  export class Request {
    @ApiProperty()
    @IsString()
      id: string;
  }

  export class Response {
    @ApiProperty()
      user: Omit<IUser, 'passwordHash'>;
  }
}
