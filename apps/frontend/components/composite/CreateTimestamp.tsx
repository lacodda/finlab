
import React, { type DetailedHTMLProps, type HTMLAttributes, useState, useCallback } from 'react';
import cn from 'classnames';
import { FinlabApi, TimestampType } from '../../graphql';
import { Button } from '../elementary/Button';
import { Input } from '../elementary/Input';

export interface CreateTimestampProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const CreateTimestamp = ({ className, ...props }: CreateTimestampProps): JSX.Element => {
  const [timestamp, setTimestamp] = useState<string>('');
  const [type, setType] = useState<TimestampType>(TimestampType.Start);

  const timestampCreate = FinlabApi.workTime.timestamp.Create({ timestamp: new Date(timestamp), type });
  const Save = useCallback(() => {
    void timestampCreate.runFetch();
  }, [timestampCreate]);

  return (
    <div className={cn(className)}>
      <form>
        <Input type='timestamp' placeholder='Timestamp' label='Timestamp' value={timestamp} onChange={(e) => { setTimestamp(e.target.value); }} />
        <Input type='type' placeholder='Type' label='Type' value={type} onChange={(e) => { setType(e.target.value as TimestampType); }} />
        <Button className='mt-6 w-full justify-center font-bold uppercase' onClick={Save}>Save</Button>
      </form>
    </div>
  );
};
