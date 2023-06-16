export default async function SignOutHandler(req, res) {
    if (req.method === 'POST' || req.method === 'GET') {
      try {
        // Clear the user session
        await req.session.destroy();
  
        res.status(200).json({ message: 'Sign out successful!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Return a response with method not allowed status code for unsupported requests
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  