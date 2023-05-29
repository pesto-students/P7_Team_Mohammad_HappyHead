// pages/api/qna.js
import { connectToDatabase } from '../../../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { questions, answers, recommendation } = req.body;
      const { db } = await connectToDatabase();
      const collection = db.collection('Users');

      // Update the specific user's document with the provided data
      await collection.updateOne(
        { username: req.query.username },
        {
          $set: {
            questions,
            answers,
            recommendation,
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
