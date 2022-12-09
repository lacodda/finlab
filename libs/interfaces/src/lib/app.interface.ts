export enum AppStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Deleted = 'Deleted'
}

export interface IApp {
  _id: string;
  name: string;
}
