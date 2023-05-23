const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;


export default async function ContactUshandler(req, res) {
  if (req.method === 'POST') {
    try {
      let { db } = await connectToDatabase();

      const { name, email, query } = req.body
      await db.collection('Contact').insertOne({ name, email, query })

      res.status(200).json({ message: 'Form submission successful!' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    // Return a response with method not allowed status code for non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}
