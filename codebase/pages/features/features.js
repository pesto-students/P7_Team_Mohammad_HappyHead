import React from 'react';
import useAuth from '../../utils/auth';
import Features from '../../components/Features/main/Index';

function FeaturesPage() {
  const isLoggedIn = useAuth();
  return  <Features isLoggedIn={isLoggedIn} />
}

export default FeaturesPage
