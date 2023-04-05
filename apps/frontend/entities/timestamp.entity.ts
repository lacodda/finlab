import { FinlabApi, type ITimestampCreateRequest, TimestampType, type IResult, type ITimestampCreateResponse, type ITimestampDeleteResponse } from '../graphql';

export class Timestamp implements ITimestampCreateRequest {
  timestamp: Date;
  type: TimestampType;

  constructor(value?: ITimestampCreateRequest) {
    this.timestamp = value?.timestamp ?? new Date();
    this.type = value?.type ?? TimestampType.Start;
  }

  public entity(): ITimestampCreateRequest {
    return {
      timestamp: this.timestamp,
      type: this.type
    };
  }

  public setTimestamp(value: string): this {
    this.timestamp = new Date(value);
    return this;
  }

  public setType(value: TimestampType): this {
    this.type = value;
    return this;
  }

  public async save(): Promise<IResult<ITimestampCreateResponse>> {
    const { data, error } = await FinlabApi.workTime.timestamp.create(this);
    return { data, error };
  }

  public async delete(): Promise<IResult<ITimestampDeleteResponse>> {
    const { data, error } = await FinlabApi.workTime.timestamp.delete(this);
    return { data, error };
  }
}
