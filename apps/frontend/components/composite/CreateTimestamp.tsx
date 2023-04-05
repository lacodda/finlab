
import React, { type DetailedHTMLProps, type HTMLAttributes, useState, useEffect } from 'react';
import cn from 'classnames';
import { TimestampType } from '../../graphql';
import { Button } from '../elementary/Button';
import { Input } from '../elementary/Input';
import { Timestamp } from '../../entities';

export interface CreateTimestampProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value?: Timestamp;
}

export const CreateTimestamp = ({ className, value, ...props }: CreateTimestampProps): JSX.Element => {
  const [timestampStr, setTimestampStr] = useState<string>('');
  const [type, setType] = useState<TimestampType>(TimestampType.Start);
  const [timestamp, setTimestamp] = useState<Timestamp>(new Timestamp());

  async function save(): Promise<void> {
    await new Timestamp().setTimestamp(timestampStr).setType(type).save();
  }

  useEffect(() => {
    setTimestamp(new Timestamp(value));
    setTimestampStr(timestamp.timestamp.toISOString());
    setType(timestamp.type);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={cn(className)}>
      <form>
        <Input type='timestamp' placeholder='Timestamp' label='Timestamp' value={timestampStr} onChange={(e) => { setTimestampStr(e.target.value); }} />
        <Input type='type' placeholder='Type' label='Type' value={type} onChange={(e) => { setType(e.target.value as TimestampType); }} />
        <Button className='mt-6 w-full justify-center font-bold uppercase' onClick={() => { void save(); }}>Save</Button>
      </form>
    </div>
  );
};
