
import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';
import { FinlabApi } from '../../api';

export interface UserProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const UserProfile = ({ className, ...props }: UserProfileProps): JSX.Element => {
  const { data, runFetch, error, loading } = FinlabApi.workTime.timestamp.GetAll();
  useEffect(() => {
    runFetch(true);
  }, [runFetch]);

  return (
    <div className={cn(className)}>
      {error && <p>There is an error!</p>}
      {loading && <p>Loading...</p>}
      {data?.data.map((i, k) => <p key={k}>{i.timestamp}</p>)}
    </div>
  );
};
