const { connectToDatabase } = require('../../utils/mongodb');

export default async function ContactUshandler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the MongoDB Atlas cluster
      let { db } = await connectToDatabase();

      // Update the Contact us form inputs in the database
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
