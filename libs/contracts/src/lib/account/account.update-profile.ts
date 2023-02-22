import { IsString } from 'class-validator';
import { type IUser } from '@finlab/interfaces';

export namespace AccountUpdateProfile {
  export const topic = 'account.update-profile.command';

  export class Request {
    @IsString()
      id: string;

    @IsString()
      user: Pick<IUser, 'displayName'>;
  }

  export class Response {
    user: Omit<IUser, 'passwordHash'>;
  }
}
