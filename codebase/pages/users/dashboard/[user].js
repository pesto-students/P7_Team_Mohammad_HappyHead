import React from 'react';
import { useRouter } from 'next/router';
import UserDashboard from '../../../components/Users/userDashboard/Index';

const DashboardUser = () => {
  const router = useRouter();
  const { username } = router.query;

  return <UserDashboard username={username} />;
};

export default DashboardUser;
