
import React, { type DetailedHTMLProps, type HTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { FinlabApi } from '../../graphql';
import { CreateTimestamp } from './CreateTimestamp';
import { Button } from '../elementary/Button';

export interface UserProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const UserProfile = ({ className, ...props }: UserProfileProps): JSX.Element => {
  const { data, runFetch, error, loading } = FinlabApi.workTime.timestamp.Get({ raw: true });
  useEffect(() => {
    void runFetch();
  }, [runFetch]);

  const [timestamp, setTimestamp] = useState<string>('');
  const timestampDelete = FinlabApi.workTime.timestamp.Delete({ timestamp: new Date(timestamp) });
  // useEffect(() => {}, [timestamp]);
  const Delete = (t: string): void => {
    setTimestamp(t);
    void timestampDelete.runFetch();
  };

  return (
    <div className={cn(className)}>
      {error && <p>There is an error!</p>}
      {loading && <p>Loading...</p>}
      <div className='grid grid-cols-3 justify-center items-center gap-4'>
        {data?.timestamps.data.map((i, k) => <>
          <div key={k}>{i.timestamp}</div>
          <div>{i.type}</div>
          <Button className='w-full justify-center font-bold uppercase' onClick={() => { Delete(i.timestamp); }}>Delete</Button>
        </>)}
      </div>
      <CreateTimestamp />
    </div>
  );
};
