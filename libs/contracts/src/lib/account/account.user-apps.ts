import { IsString } from 'class-validator';
import { IUserApps } from '@finlab/interfaces';

export namespace AccountUserApps {
  export const topic = 'account.user-apps.query';

  export class Request {
    @IsString()
      id: string;
  }

  export class Response {
    apps: IUserApps[];
  }
}
