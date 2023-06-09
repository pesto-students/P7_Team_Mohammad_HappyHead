const { connectToDatabase } = require('../../../utils/mongodb');
import { hashPassword } from '../authUtil';
import { getUserByEmail } from './userDao';

export default async function SignUphandler(req, res) {
  if (req.method === 'POST') {
    try {
      // Update the Contact us form inputs in the database
      const { name, email, password, username } = req.body;

      let user = await updateDBSignUp(name, email, password, username);
      console.log(user)
      res.status(200).json({ message: 'Form submission successful!', username: user.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Return a response with method not allowed status code for non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const updateDBSignUp = async (name, email, password, username) => {
  // Connect to the MongoDB Atlas cluster
  let { db } = await connectToDatabase();

  let user = await getUserByEmail(email);

  //default fields to store for a new user 
  if (!user) {
    let hashedPassword, salt;
    if(password) {
      const hashes = await hashPassword(password);
      hashedPassword = hashes.hashedPassword;
      salt = hashes.salt;
    } 
    user = {
          name: name,
          username: username,
          email: email,
          phonenumber: '',
          dob: '',
          toolsCompleted: [],
          answers: {
            question: [],
            answers: [],
            recommendations: [],
          },
          bookedSlots:[],
          hashedPassword: hashedPassword,
          salt: salt,
          role: 'user',
        };
 
    await db.collection('Users').insertOne(user);
  }
  return user;
};
