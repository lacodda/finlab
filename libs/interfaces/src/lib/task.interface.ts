export interface ITask {
  _id?: string;
  userId: string;
  date: Date;
  text: string;
  completeness?: number;
}
