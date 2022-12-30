import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @ApiProperty()
    @IsEmail()
      email: string;

    @ApiProperty()
    @IsString()
      password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
      displayName?: string;
  }

  export class Response {
    @ApiProperty()
      email: string;
  }
}

export class AccountRegisterResponse {
  @ApiProperty()
    email: string;
}
