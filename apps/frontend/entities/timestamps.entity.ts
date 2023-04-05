import { type CombinedError } from 'urql';
import { FinlabApi, type ITimestampsRequest } from '../graphql';
import { Timestamp } from './timestamp.entity';

export class Timestamps {
  public timestampList: Timestamp[] = [];
  public loading = false;
  public error?: CombinedError;
  public selected?: Timestamp;

  public async fetch(params?: ITimestampsRequest): Promise<void> {
    const { data, error } = await FinlabApi.workTime.timestamp.list(params);
    this.error = error;
    this.timestampList = data?.timestamps.data.map(item => new Timestamp({ ...item, timestamp: new Date(item.timestamp) })) ?? [];
  }
}
