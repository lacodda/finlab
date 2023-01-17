import { ITimestamp } from '@finlab/interfaces';
import { TimestampEntity } from './timestamp.entity';

type BreaksType = Array<[TimestampEntity, TimestampEntity]>;

export class TimestampsEntity {
  timestamps: TimestampEntity[];
  start?: TimestampEntity;
  end?: TimestampEntity;
  breaks: BreaksType;

  constructor(timestamps: ITimestamp[]) {
    this.timestamps = timestamps.map(timestamp => new TimestampEntity(timestamp));
  }

  public setStart(): this {
    this.start = this.timestamps.find(({ type }) => type === 'Start');
    return this;
  }

  public setEnd(): this {
    this.end = this.timestamps.findLast(({ type }) => type === 'End');
    return this;
  }

  public setBreaks(): this {
    this.breaks = this.timestamps.reduce((acc: BreaksType, timestamp) => {
      if (timestamp.type === 'StartBreak') {
        acc.push([timestamp, timestamp]);
      }
      const prev = acc[acc.length - 1];
      if (timestamp.type === 'EndBreak' && prev && prev[1].type === 'StartBreak') {
        prev[1] = timestamp;
      }
      return acc;
    }, []).filter(([_, { type }]) => type === 'EndBreak');

    return this;
  }

  public filterBreaks(diff: number): this {
    this.breaks = this.breaks.filter(([{ timestamp: t1 }, { timestamp: t2 }]) => this.getDiff(t1, t2) >= diff);

    return this;
  }

  public getResult(diff: number): Array<Omit<ITimestamp, 'userId'>> {
    this.setStart().setEnd().setBreaks().filterBreaks(diff);
    const timestamps = this.breaks.flat();
    if (this.start) {
      timestamps.unshift(this.start);
    }
    if (this.end) {
      timestamps.push(this.end);
    }

    return timestamps.map(timestamp => timestamp.entity);
  }

  public getTime(diff: number): string {
    this.setStart().setEnd().setBreaks().filterBreaks(diff);
    let time = 0;
    if (this.start && this.end) {
      time = this.getDiff(this.start.timestamp, this.end.timestamp);
    }
    for (const [{ timestamp: t1 }, { timestamp: t2 }] of this.breaks) {
      time = time - this.getDiff(t1, t2);
    }
    return this.getHours(time);
  }

  private getDiff(t1: Date, t2: Date): number {
    let diff = (t2.getTime() - t1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  private getHours(minutes: number): string {
    const hours = (minutes / 60);
    const rhours = Math.floor(hours);
    const mins = (hours - rhours) * 60;
    const rmins = Math.round(mins);
    return `${rhours}:${rmins}`;
  }
}
