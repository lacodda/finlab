
import React, { type DetailedHTMLProps, type HTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { CreateTimestamp } from './CreateTimestamp';
import { Button } from '../elementary/Button';
import { type Timestamp, Timestamps } from '../../entities';

export interface UserProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const UserProfile = ({ className, ...props }: UserProfileProps): JSX.Element => {
  const [timestamp, setTimestamp] = useState<Timestamp>();
  const [timestampList, setTimestampList] = useState<Timestamp[]>([]);
  const [timestampError, setTimestampError] = useState<Error>();
  const timestamps = new Timestamps();

  async function getTimestamps(): Promise<void> {
    await timestamps.fetch({ raw: true });
    setTimestampList(timestamps.timestampList);
    setTimestampError(timestamps.error);
  }

  useEffect(() => {
    void getTimestamps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(className)}>
      {timestampError && <p>There is an error!</p>}
      {/* {timestamps.loading && <p>Loading...</p>} */}
      <Button className='w-full justify-center font-bold uppercase' onClick={() => { void getTimestamps(); }}>Ok</Button>
      <div className='grid grid-cols-3 justify-center items-center gap-4'>
        {timestampList.map((item, k) => <div key={k} className='contents cursor-pointer' onClick={() => { setTimestamp(item); }}>
          <div>{item.timestamp.toISOString()}</div>
          <div>{item.type}</div>
          <Button className='w-full justify-center font-bold uppercase' onClick={() => { void item.delete(); }}>Delete</Button>
        </div>)}
      </div>
      <CreateTimestamp value={timestamp} />
    </div>
  );
};
