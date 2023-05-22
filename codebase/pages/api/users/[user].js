import Users from '../../../helpers/api/user';
import { connectToCluster } from './db';

const userProfileHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { username } = req.query;

      // Connect to the MongoDB Atlas cluster
      const mongoClient = await connectToCluster(process.env.DB_URI);

      // Find the user by unsername
      const user = await Users.findById(username);

      // Send the user profile data as the response
      res.status(200).json(user);

      // Close the MongoDB connection
      await mongoClient.close();
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { username } = req.query;
      const updatedProfile = req.body;

      // Connect to the MongoDB Atlas cluster
      const mongoClient = await connectToCluster(process.env.DB_URI);

      // Update the user profile in the database
      await Users.findByIdAndUpdate(username, updatedProfile);

      // Send a success response
      res.status(200).json({ message: 'Profile updated successfully' });

      // Close the MongoDB connection
      await mongoClient.close();
    } catch (error) {
      console.error('Failed to update user profile', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default userProfileHandler;
