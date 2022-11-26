import { Document, Types } from 'mongoose';
import { AppStatus, IUser, IUserApps, UserRole } from '@finlab/interfaces';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserApps extends Document implements IUserApps {
  @Prop({ required: true })
    appId: string;

  @Prop({ required: true, enum: AppStatus, type: String })
    appStatus: AppStatus;
}

export const UserAppsSchema = SchemaFactory.createForClass(UserApps);

@Schema()
export class User extends Document implements IUser {
  @Prop()
    displayName?: string;

  @Prop({ required: true })
    email: string;

  @Prop({ required: true })
    passwordHash: string;

  @Prop({ required: true, enum: UserRole, type: String, default: UserRole.User })
    role: UserRole;

  @Prop({ type: [UserAppsSchema], _id: false })
    apps: Types.Array<UserApps>;
}

export const UserSchema = SchemaFactory.createForClass(User);
