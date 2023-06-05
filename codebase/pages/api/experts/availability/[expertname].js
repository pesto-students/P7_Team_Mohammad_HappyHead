const { connectToDatabase } = require('../../../../utils/mongodb');

const expertAvailabilityHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { expertname } = req.query;
      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the expert by expertname
      const expert = await db.collection('Experts').findOne({ expertname: expertname });
      // console.log(`experts is: ${expert}`)
      if (!expert) {
        return res.status(404).json({ error: 'Expert not found' });
      }

      const availability = expert.availability;

      if (!availability) {
        return res.status(404).json({ error: 'Expert availability not found for the specified date' });
      }

      return res.status(200).json({ availability: availability });
    } catch (error) {
      console.log('Error fetching expert:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      // Implement the logic to save expert availability by expertname
      const { expertname } = req.body;
      console.log(req.body)
      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the expert by expertname
      await db.collection('Experts').updateOne({ expertname: expertname }, {
        $set: {
          availability: req.body.availability,
        }
      });

      await res.status(200).json({ message: 'Expert availability saved successfully' });
    } catch (error) {
      console.error('Failed to update expert profile', error);
      res.status(500).json({ error: 'Failed to update expert profile' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default expertAvailabilityHandler;
