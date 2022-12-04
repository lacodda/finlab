export enum UserRole {
  Administrator = 'Administrator',
  Manager = 'Manager',
  User = 'User',
}

export enum AppStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Deleted = 'Deleted'
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  apps?: IUserApps[];
}

export interface IUserApps {
  appId: string;
  appStatus: AppStatus;
}
