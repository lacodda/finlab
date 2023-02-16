import { type ITimestamp, type ITimestampsResult } from '@finlab/interfaces';
import { TimestampEntity } from './timestamp.entity';
import { Time, List } from '@finlab/helpers';

type BreaksType = Array<[TimestampEntity, TimestampEntity]>;

export class TimestampsEntity {
  timestamps: TimestampEntity[] = [];

  processedTimestamps: TimestampEntity[] = [];
  workTime: number[] = [];
  breaks: number[] = [];
  totalTime = 0;
  processed = false;

  constructor(timestamps: ITimestamp[], public minBreakTime: number = 0) {
    this.timestamps = timestamps.map(timestamp => new TimestampEntity(timestamp));
  }

  public getStart(): TimestampEntity | undefined {
    return this.timestamps.find(({ type }) => type === 'Start');
  }

  public getEnd(): TimestampEntity | undefined {
    return this.timestamps.findLast(({ type }) => type === 'End');
  }

  public getBreaks(): BreaksType {
    return this.timestamps.reduce((acc: BreaksType, timestamp) => {
      if (timestamp.type === 'StartBreak') {
        acc.push([timestamp, timestamp]);
      }
      const prev = acc[acc.length - 1];
      if (timestamp.type === 'EndBreak' && prev && prev[1].type === 'StartBreak') {
        prev[1] = timestamp;
      }
      return acc;
    }, []).filter(([{ timestamp: from }, { timestamp: to, type }]) => type === 'EndBreak' && Time.diffInMinutes(from, to) >= this.minBreakTime);
  }

  public process(): this {
    const start = this.getStart();
    const end = this.getEnd();
    const breaks = this.getBreaks();

    this.processedTimestamps = breaks.flat();
    if (start) {
      this.processedTimestamps.unshift(start);
    }
    if (end) {
      this.processedTimestamps.push(end);
    }

    this.workTime = this.getArrayOfDiff(this.processedTimestamps);
    this.breaks = this.getArrayOfDiff(breaks.flat());
    this.totalTime = List.sum(this.workTime);

    this.processed = true;
    return this;
  }

  public result(): ITimestampsResult {
    return {
      timestamps: (this.processed ? this.processedTimestamps : this.timestamps).map(timestamp => timestamp.entity),
      workTime: this.workTime,
      breaks: this.breaks,
      totalTime: this.totalTime
    };
  }

  private getArrayOfDiff (timestamps: TimestampEntity[]): number[] {
    if (timestamps?.length <= 1) {
      return [];
    }
    return [...List.chunks(timestamps, 2)].map(([from, to]) => Time.diffInMinutes(from?.timestamp, to?.timestamp));
  }
}
