
import React, { type DetailedHTMLProps, type HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';
import { FinlabApi } from '../../graphql';

export interface UserProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const UserProfile = ({ className, ...props }: UserProfileProps): JSX.Element => {
  const { data, runFetch, error, loading } = FinlabApi.workTime.timestamp.Get();
  useEffect(() => {
    void runFetch();
  }, [runFetch]);

  return (
    <div className={cn(className)}>
      {error && <p>There is an error!</p>}
      {loading && <p>Loading...</p>}
      {data?.timestamps.data.map((i, k) => <p key={k}>{i.timestamp}</p>)}
    </div>
  );
};
