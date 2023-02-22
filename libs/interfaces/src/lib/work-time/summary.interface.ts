export interface ISummary {
  _id?: string;
  userId: string;
  date: Date;
  time: number;
}

export interface ISummaryFindByQuery {
  data: ISummary[];
  totalTime: number;
}

export interface ISummaryFindByQueryParams {
  userId: string;
  date?: {
    $gte: Date | string;
    $lte: Date | string;
  };
}
