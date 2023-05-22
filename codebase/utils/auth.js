import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  //Sets the boolean value based on whether the user is logged in ot not
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
          // Redirect to the login page by replacing thw current path without pushing it to browser history
          // The user can't hit back button on browser and go back to the logic page
          router.replace('/login'); 
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
