import { useRouter } from 'next/router'

// Function to redirect to a specific page
const redirectToPage = (path) => {
  const router = useRouter();
  router.push(path);
};

export default redirectToPage
