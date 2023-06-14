const { connectToDatabase } = require('../../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;
import { validatePassword } from '../authUtil';

export default async function SignInHandler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get the Sign-in form inputs from the request
      const { email, password } = req.body;

      let user = await authenticateUser(email, password);

      res.status(200).json({ message: 'Authentication successful!', username: user.username });

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  } else {
    // Return a response with method not allowed status code for non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const authenticateUser = async (email, password) => {
  // Connect to the MongoDB Atlas cluster
  let { db } = await connectToDatabase();

  let user = await db.collection('Users').findOne({ email: email });

  if (!user) {
    throw new Error('Invalid credentials');
  }
  // console.log(user)
  const { hashedPassword, salt } = user;

  // console.log(`${hashedPassword} - ${salt} - ${password}`);

  if (await validatePassword(hashedPassword, salt, password)) {
    // Password is valid
    console.log('Authentication successful');
    return user;
  } else {
    // Password is invalid
    throw new Error('Invalid credentials');
  }
};
