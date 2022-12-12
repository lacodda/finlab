export interface IWorkTime {
  _id?: string;
  userId: string;
  date: Date;
  time: number;
}

export interface IWorkTimeFindByQueryParams {
  userId: string;
  date?: {
    $gte: string;
    $lte: string;
  };
}
