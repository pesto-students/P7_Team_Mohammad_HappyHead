import { connectToDatabase } from '../../../../../utils/mongodb';

const checkUsernameAvailability = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { username } = req.query;

      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      const user = await db.collection('Users').findOne({ username });

      // Send the availability status as the response
      const available = !user || user.username === username;
      res.status(200).json({ available });
    } catch (error) {
      console.error('Failed to check username availability', error);
      res.status(500).json({ error: 'Failed to check username availability' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default checkUsernameAvailability;
