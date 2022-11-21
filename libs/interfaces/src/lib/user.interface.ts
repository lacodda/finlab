export enum UserRole {
  Administrator = 'Administrator',
  Manager = 'Manager',
  User = 'User',
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
