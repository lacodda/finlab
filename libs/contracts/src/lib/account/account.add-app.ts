import { IsString } from 'class-validator';
import { type IUserApps } from '@finlab/interfaces';

export namespace AccountAddApp {
  export const topic = 'account.add-app.command';

  export class Request {
    @IsString()
      userId: string;

    @IsString()
      appId: string;
  }

  export class Response {
    apps: IUserApps[];
  }
}
