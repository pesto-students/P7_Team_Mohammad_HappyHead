const { connectToDatabase } = require('../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;
import {hashPassword} from './authUtil';


export default async function SignUphandler(req, res) {
  if (req.method === 'POST') {
    try {
      
      // Connect to the MongoDB Atlas cluster
      let { db } = await connectToDatabase();

      // Update the Contact us form inputs in the database
      const { name, email, password } = req.body

      const {hashedPassword, salt} = await hashPassword(password);
        
      let user = await db.collection('User').findOne({ email: email });

      if (!user) {
        await db.collection('User').insertOne({ name, email, hashedPassword, salt })

      }

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
