const { connectToDatabase } = require('../../../../utils/mongodb')
import { hashPassword } from '../../authUtil';

const expertProfileHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {

      const expertname = req.query.expertname;

      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      let expert = await db.collection('Experts').findOne({ expertname: expertname });

      // Send the user profile data as the response
      res.status(200).json(expert);
    } catch (error) {
      console.error('Failed to fetch expert profile', error);
      res.status(500).json({ error: 'Failed to fetch expert profile' });
    }
  } else if (req.method === 'PUT') {
    try {
          // Connect to the MongoDB Atlas cluster
      let { db } = await connectToDatabase();

      // Convert the plaintext password to hashedPassword
      const { hashedPassword, salt } = await hashPassword(req.body.editedProfile.password);

      // Update the user profile in the database
      await db.collection('Experts').updateOne({ expertname: req.body.oldExpertname }, {
        $set: {
          name: req.body.editedProfile.name,
          expertname: req.body.editedProfile.expertname,
          email: req.body.editedProfile.email,
          phoneNumber: req.body.editedProfile.phoneNumber,
          qualifications: req.body.editedProfile.qualifications,
          yearsOfExperience: req.body.editedProfile.yearsOfExperience,
          speciality: req.body.editedProfile.speciality,
          consultationFee: req.body.editedProfile.consultationFee,
          hashedPassword: hashedPassword,
          salt: salt,
        }
      });

      // Send a success response
      res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
      console.error('Failed to update expert profile', error);
      res.status(500).json({ error: 'Failed to update expert profile' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default expertProfileHandler;
