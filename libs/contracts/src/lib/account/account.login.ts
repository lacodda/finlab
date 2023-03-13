import { IsEmail, IsString } from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export const AccountLoginTopic = 'account.login.command';

@InputType()
export class AccountLoginRequest {
  @ApiProperty()
  @IsEmail()
  @Field(() => String, { description: 'email of the user' })
    email: string;

  @ApiProperty()
  @IsString()
  @Field(() => String, { description: 'password of the user' })
    password: string;
}

@ObjectType()
export class AccountLoginResponse {
  @ApiProperty()
  @Field(() => String, { description: 'Generated access_token of the user' })
    access_token: string;
}
