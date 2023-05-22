import React from 'react';
import { useRouter } from 'next/router';
import ToolPage from '../../../../components/Users/practiceTools/[id]';

const ToolPageUser = () => {
  const router = useRouter();
  const { username, toolId } = router.query;

  return <ToolPage username={username} toolId={toolId} />;
};

export default ToolPageUser;
