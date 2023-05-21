import { connectToCluster } from './db';

// API endpoint handler for userProfile
const userProfileHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to the MongoDB Atlas cluster
      const mongoClient = await connectToCluster(process.env.DB_URI)
      // Get the "users" collection from the database
      const users = mongoClient.db('<database>').collection('user')
      // Find the user based on their email ID
      const user = await users.findOne({ email: 'johndoe' })
      // Send the user profile data as the response
      res.status(200).json(user)
      // Close the MongoDB connection
      await mongoClient.close()
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      res.status(500).json({ error: 'Failed to fetch user profile' })
    }
  } else if (req.method === 'PUT') {
    try {
      // Connect to the MongoDB Atlas cluster
      const mongoClient = await connectToCluster(process.env.DB_URI)
      // Get the "users" collection from the database
      const users = mongoClient.db('<database>').collection('user')
      // Update the user profile in the database
      await users.updateOne({ email: 'johndoe' }, { $set: req.body })
      // Send a success response
      res.status(200).json({ message: 'Profile updated successfully' })
      // Close the MongoDB connection
      await mongoClient.close()
    } catch (error) {
      console.error('Failed to update user profile', error);
      res.status(500).json({ error: 'Failed to update user profile' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export default userProfileHandler
