const { connectToDatabase } = require('../../../../utils/mongodb')
import { hashPassword } from '../../authUtil';

const userProfileHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const username = req.query.username;

      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      let user = await db.collection('Users').findOne({ username: username });

      // Send the user profile data as the response
      res.status(200).json(user);

    } catch (error) {
      console.error('Failed to fetch user profile', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  } else if (req.method === 'PUT') {
    try {
      // Connect to the MongoDB Atlas cluster
      let { db } = await connectToDatabase();

      // Convert the plaintext password to hashedPassword
      const { hashedPassword, salt } = await hashPassword(req.body.editedProfile.password);

      // Update the user profile in the database
      await db.collection('Users').updateOne({ username: req.body.oldUsername }, {
        $set: {
          name: req.body.editedProfile.name,
          email: req.body.editedProfile.email,
          username: req.body.editedProfile.username,
          phonenumber: req.body.editedProfile.phonenumber,
          dob: req.body.editedProfile.dob,
          hashedPassword: hashedPassword,
          salt: salt,
        }
      });

      // Send a success response
      res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
      console.error('Failed to update user profile', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default userProfileHandler;
