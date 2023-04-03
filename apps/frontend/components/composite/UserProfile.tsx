
import React, { type DetailedHTMLProps, type HTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { FinlabApi, type ITimestamp } from '../../graphql';
import { CreateTimestamp } from './CreateTimestamp';
import { Button } from '../elementary/Button';

export interface UserProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const UserProfile = ({ className, ...props }: UserProfileProps): JSX.Element => {
  const timestamps = FinlabApi.workTime.timestamp.Get();
  useEffect(() => {
    void timestamps.exec({ raw: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [timestamp, setTimestamp] = useState<ITimestamp>();

  const timestampDelete = FinlabApi.workTime.timestamp.Delete();
  const Delete = (e: React.MouseEvent, timestamp: string): void => {
    e.stopPropagation();
    void timestampDelete.exec({ timestamp: new Date(timestamp) });
  };

  return (
    <div className={cn(className)}>
      {timestamps.error && <p>There is an error!</p>}
      {timestamps.loading && <p>Loading...</p>}
      <div className='grid grid-cols-3 justify-center items-center gap-4'>
        {timestamps.data?.timestamps.data.map((i, k) => <div key={k} className='contents cursor-pointer' onClick={() => { setTimestamp(i); }}>
          <div>{i.timestamp}</div>
          <div>{i.type}</div>
          <Button className='w-full justify-center font-bold uppercase' onClick={(e) => { Delete(e, i.timestamp); }}>Delete</Button>
        </div>)}
      </div>
      <CreateTimestamp value={timestamp} />
    </div>
  );
};
