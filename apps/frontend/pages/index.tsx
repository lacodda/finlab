
import React from 'react';
import { withAdminLayout } from '../layouts';

function Index(): JSX.Element {
  return (
    <div>Index page</div>
  );
}

export default withAdminLayout(Index);
