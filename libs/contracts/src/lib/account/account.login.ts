import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsEmail()
      email: string;

    @IsString()
      password: string;
  }

  export class Response {
    @ApiProperty()
      access_token: string;
  }
}
