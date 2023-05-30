import { connectToDatabase } from '../../../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
     const username = req.query.username;

      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      let user = await db.collection('Users').findOne({ username: username });
    //  console.log(user)
      // Send the user profile data as the response
      res.status(200).json(user);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  }
  else if (req.method === 'POST') {
    try {
      const { questions, answers, recommendations } = req.body;
      console.log(req.body)
      const { db } = await connectToDatabase();
      const collection = db.collection('Users');

      // Update the specific user's document with the provided data
      await collection.updateOne(
        { username: req.query.username },
        {
          $set: {
            questions,
            answers,
            recommendations,
          },
        }
      );

      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving data' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
