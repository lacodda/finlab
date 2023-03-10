export interface ITask {
  _id?: string;
  userId: string;
  taskId?: string;
  date: Date;
  name: string;
  comment?: string;
  completeness?: number;
  excludedFromSearch?: boolean;
}

export interface ITaskFindByQueryParams {
  userId: string;
  date: {
    $gte: Date | string;
    $lte: Date | string;
  };
  name?: string;
}

export interface ITaskFindIncompleteParams extends ITaskFindByQueryParams {
  incomplete?: boolean;
  includeAll?: boolean;
  excludeTaskIds?: string[];
}

export interface ITaskFindForDay {
  userId: string;
  date: Date | string;
  name?: string;
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
