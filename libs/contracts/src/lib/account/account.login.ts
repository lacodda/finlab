import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @ApiProperty()
    @IsEmail()
      email: string;

    @ApiProperty()
    @IsString()
      password: string;
  }

  export class Response {
    @ApiProperty()
      access_token: string;
  }
}
