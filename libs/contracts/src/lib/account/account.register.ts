import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

export const AccountRegisterTopic = 'account.register.command';

@InputType()
export class AccountRegisterRequest {
  @ApiProperty()
  @IsEmail()
  @Field(() => String, { description: 'email of the user' })
    email: string;

  @ApiProperty()
  @IsString()
  @Field(() => String, { description: 'password of the user' })
    password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Field(() => String, { description: 'name of the user', nullable: true })
    displayName?: string;
}

@ObjectType()
export class AccountRegisterResponse {
  @ApiProperty()
  @Field(() => String, { description: 'email of the user' })
    email: string;
}
