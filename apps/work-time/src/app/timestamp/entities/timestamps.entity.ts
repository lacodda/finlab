import { ITimestamp, ITimestampsResult } from '@finlab/interfaces';
import { TimestampEntity } from './timestamp.entity';
import { Time } from '@finlab/helpers';

type BreaksType = Array<[TimestampEntity, TimestampEntity]>;

export class TimestampsEntity {
  timestamps: TimestampEntity[] = [];

  processedTimestamps: TimestampEntity[] = [];
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
    if (start && end) {
      this.totalTime = Time.diffInMinutes(start.timestamp, end.timestamp);
    }
    for (const [{ timestamp: from }, { timestamp: to }] of breaks) {
      this.totalTime = this.totalTime - Time.diffInMinutes(from, to);
    }
    this.processed = true;

    return this;
  }

  public result(): ITimestampsResult {
    return {
      timestamps: (this.processed ? this.processedTimestamps : this.timestamps).map(timestamp => timestamp.entity),
      totalTime: this.totalTime
    };
  }
}
