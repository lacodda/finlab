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
  date: {
    $gte: Date;
    $lte: Date;
  };
  name?: string;
}

export interface ITaskFindIncompleteParams {
  userId: string;
  date: {
    $gte: Date;
    $lte: Date;
  };
  incomplete?: boolean;
  includeAll?: boolean;
}

export interface ITaskFindIncompleteResult {
  _id: string;
  tasks: ITask[];
  completeness: number;
}

export interface ITaskUpdate {
  name: string;
  comment?: string;
  completeness?: number;
  excludedFromSearch?: boolean;
}
