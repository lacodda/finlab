export interface ITask {
  _id?: string;
  userId: string;
  date: Date;
  text: string;
  completeness?: number;
}

export interface ITaskFindByQueryParams {
  userId: string;
  date?: {
    $gte: string;
    $lte: string;
  };
  text?: string;
}
