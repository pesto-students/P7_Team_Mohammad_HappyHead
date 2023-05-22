import React from 'react';
import { useRouter } from 'next/router';
import UserDashboard from '../../../components/Users/UserDashboard';

const DashboardUser = () => {
  const router = useRouter();
  const { username } = router.query;

  return <UserDashboard username={username} />;
};

export default DashboardUser;
