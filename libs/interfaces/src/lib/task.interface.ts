export interface ITask {
  _id?: string;
  userId: string;
  date: Date;
  name: string;
  comment?: string;
  completeness?: number;
  excludedFromSearch?: boolean;
}

export interface ITaskFindByQueryParams {
  userId: string;
  date?: {
    $gte: string;
    $lte: string;
  };
  name?: string;
  comment?: string;
  completeness?: number;
  excludedFromSearch?: boolean;
}

export interface ITaskUpdate {
  name: string;
  comment?: string;
  completeness?: number;
  excludedFromSearch?: boolean;
}
