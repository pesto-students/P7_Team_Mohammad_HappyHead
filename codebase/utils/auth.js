import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulating an API call to check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        // Make your actual API call here to check if the user is logged in
        const response = await fetch('/api/check-login');
        const data = await response.json();

        if (data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          router.push('/login'); // Redirect to the login page if the user is not logged in
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [router]);

  return isLoggedIn;
};

export default useAuth;
