export interface IWorkTime {
  _id?: string;
  userId: string;
  date: Date;
  time: number;
}

export interface IWorkTimeFindByQueryParams {
  date?: {
    $gte: string;
    $lte: string;
  };
}
