import React from 'react';
import { withAdminLayout } from '../../layouts';
import { useRequireAuth } from '../../hooks';
import { UserProfile } from '../../components';

function User(): JSX.Element {
  const auth = useRequireAuth();
  if (!auth?.user?.id) {
    return <p>Loading...</p>;
  }

  return <UserProfile />;
}

export default withAdminLayout(User);
