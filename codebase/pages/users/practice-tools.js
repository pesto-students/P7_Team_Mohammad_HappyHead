// import React from 'react'
import useAuth from '../../utils/auth';
import Tools from '../../components/PracticeTools/Index';

function UserTools() {
  const isLoggedIn = useAuth();
  return  <Tools isLoggedIn={isLoggedIn} />
}

export default UserTools