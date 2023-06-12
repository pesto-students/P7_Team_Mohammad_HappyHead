const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;
import { hashPassword } from './authUtil';

export default async function SignUphandler(req, res) {
  if (req.method === 'POST') {
    try {
      // Update the Contact us form inputs in the database
      const { name, email, password } = req.body;

      await updateDBSignUp(name, email, password);

      res.status(200).json({ message: 'Form submission successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Return a response with method not allowed status code for non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}

const updateDBSignUp = async (name, email, password) => {
  // Connect to the MongoDB Atlas cluster
  let { db } = await connectToDatabase();

  const { hashedPassword, salt } = await hashPassword(password);

  let user = await db.collection('Users').findOne({ email: email });

  if (!user) {
    user = await db.collection('Users').insertOne({ name, email, hashedPassword, salt });
  }
};
