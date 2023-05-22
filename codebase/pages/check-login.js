const checkLoginHandler = (req, res) => {
    // Implement your logic to check the login status of the user here
    const useUser = () => ({ user: {req.query.user}})
    // You can access the request object (req) to get any necessary information
  
    // Example logic:
    const isLoggedIn = true; // Replace with your actual login status checking logic
  
    res.status(200).json({ isLoggedIn });
  };
  
  export default checkLoginHandler;