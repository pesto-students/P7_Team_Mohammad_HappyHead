import React from 'react';
import { useRouter } from 'next/router';
import UserToolsPage from '../../../components/Users/practiceTools/Index';

const ToolPageUser = () => {
  const router = useRouter();
  const { username } = router.query;

  return <UserToolsPage username={username} />;
};

export default ToolPageUser;