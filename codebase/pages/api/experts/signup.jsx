const { connectToDatabase } = require('../../../utils/mongodb');
const ObjectId = require('mongodb').ObjectId;
import { hashPassword } from '../authUtil';

export default async function SignUphandler(req, res) {
  if (req.method === 'POST') {
    try {
      // Update the Contact us form inputs in the database
      const { name, email, password, expertname } = req.body;
  
      let user = await updateDBSignUp(name, email, password, expertname);
 
      res.status(200).json({ message: 'Form submission successful!', expertname: user.expertname });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Return a response with method not allowed status code for non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const updateDBSignUp = async (name, email, password, expertname) => {
  // Connect to the MongoDB Atlas cluster
  let { db } = await connectToDatabase();

  let user = await db.collection('Experts').findOne({ email: email });

  //default fields to store for a new user 
  if (!user) {
    const { hashedPassword, salt } = await hashPassword(password);
    user = {
          name: name,
          expertname: expertname,
          email: email,
          phoneNumber: '',
          qualifications: '',
          yearsOfExperience: 0,
          speciality: '',
          consultationFee: 0,
          hashedPassword: hashedPassword,
          salt: salt,
          availability: [],
        };
 
    await db.collection('Experts').insertOne(user);
    return user;
  }
  else return;
};
