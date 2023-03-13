import { type IUser, type IUserApps, UserRole, AppStatus, type IJwtPayload } from '@finlab/interfaces';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

registerEnumType(UserRole, {
  name: 'UserRole'
});

registerEnumType(AppStatus, {
  name: 'AppStatus'
});

@ObjectType({ description: 'UserApps' })
export class UserApps implements IUserApps {
  @Field(() => String, { description: 'App ID' })
    appId: string;

  @Field(() => AppStatus, { description: 'App status' })
    appStatus: AppStatus;
}

@ObjectType({ description: 'User' })
export class User implements IUser {
  @Field(() => String)
    _id?: string;

  @Field(() => String, { description: 'User name' })
    displayName?: string;

  @Field(() => String, { description: 'User email' })
    email: string;

  passwordHash: string;

  @Field(() => UserRole, { description: 'User role' })
    role: UserRole;

  @Field(() => [UserApps], { description: 'User apps' })
    apps?: UserApps[];
}

@ObjectType({ description: 'UserJwtPayload' })
export class UserJwtPayload implements IJwtPayload {
  @ApiProperty()
  @Field(() => String, { nullable: true })
    id: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
    email: string;

  @ApiPropertyOptional()
  @Field(() => String, { nullable: true })
    displayName?: string;
}
