const { connectToDatabase } = require('../../../../utils/mongodb')

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
      const { expertname } = req.body;

      // Connect to the MongoDB Atlas cluster
      let { db } = await connectToDatabase();
     
      // Update the user profile in the database
      await db.collection('Experts').updateOne({ expertname: expertname }, {
        $set: {
            availability: req.body.availability,
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
