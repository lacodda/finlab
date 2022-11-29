import { AppStatus, IUser, IUserApps, UserRole } from '@finlab/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  apps?: IUserApps[];

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.apps = user.apps;
  }

  public addApp(appId: string): void {
    const existedApp = this.apps?.find(({ _id }) => _id === appId);
    if (existedApp) {
      throw new Error('Application already added');
    }

    this.apps.push({
      appId,
      appStatus: AppStatus.Inactive
    });
  }

  public deleteApp(appId: string): void {
    this.apps.filter(({ _id }) => _id !== appId);
  }

  public setAppStatus(appId: string, appStatus: AppStatus): this {
    const existedApp = this.apps?.find(({ _id }) => _id === appId);
    if (!existedApp) {
      this.apps.push({
        appId,
        appStatus
      });
      return this;
    }

    if (appStatus === AppStatus.Deleted) {
      this.deleteApp(appId);
      return this;
    }

    this.apps.map(app => {
      if (app._id === appId) {
        app.appStatus = appStatus;
        return app;
      }
      return app;
    });

    return this;
  }

  public async setPassword(password: string): Promise<this> {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }

  public updateProfile(displayName: string): this {
    this.displayName = displayName;
    return this;
  }
}
