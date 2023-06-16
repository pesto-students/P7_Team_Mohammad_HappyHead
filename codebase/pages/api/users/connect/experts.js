const { connectToDatabase } = require('../../../../utils/mongodb')

const getAllExpertsHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      let experts = await db.collection('Experts').find().toArray();
   
      // Send the user profile data as the response
      res.status(200).json(experts);
    } catch (error) {
      console.error('Failed to fetch expert profiles', error);
      res.status(500).json({ error: 'Failed to fetch expert profiles' });
    }
//   } else if (req.method === 'PUT') {
//     try {
//       const { expertname } = req.body;

//       // Connect to the MongoDB Atlas cluster
//       let { db } = await connectToDatabase();
     
//       // Update the user profile in the database
//       await db.collection('Experts').updateOne({ expertname: expertname }, {
//         $set: {
//             name: req.body.name,
//             expertname: req.body.expertname,
//             email: req.body.email,
//             phoneNumber: req.body.phoneNumber,
//             qualifications: req.body.qualifications,
//             yearsOfExperience: req.body.phoneNumber,
//             speciality: req.body.qualifications,
//             password: req.body.password,
//         }
//       });

//       // Send a success response
//       res.status(200).json({ message: 'Profile updated successfully' });

//     } catch (error) {
//       console.error('Failed to update expert profile', error);
//       res.status(500).json({ error: 'Failed to update expert profile' });
//     }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default getAllExpertsHandler;
