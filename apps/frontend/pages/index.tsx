
import React, { useEffect } from 'react';
import { withAdminLayout } from '../layouts';
import { FinlabApi } from '../api';

function Index(): JSX.Element {
  const { data, runFetch, error, loading } = FinlabApi.workTime.timestamp.GetAll();
  useEffect(() => {
    runFetch(true);
  }, [runFetch]);

  return (
    <>
    {error && <p>There is an error!</p>}
    {loading && <p>Loading...</p>}
    {data?.data.map((i, k) => <p key={k}>{i.timestamp}</p>)}
    </>
  );
}

export default withAdminLayout(Index);
