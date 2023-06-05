const { connectToDatabase } = require('../../../../utils/mongodb');

const expertAvailabilityHandler = async (req, res) => {
  const { expertname } = req.query;

  if (req.method === 'GET') {
    try {
      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the expert by expertname
      const expert = await db.collection('Experts').findOne({ expertname: expertname });
      console.log(expert)
      if (!expert) {
        return res.status(404).json({ error: 'Expert not found' });
      }

      const availability = expert.availability
      
      console.log(availability)
        
      if (!availability) {
        return res.status(404).json({ error: 'Expert availability not found for the specified date' });
      }

      return res.json({ availability: availability });
    } catch (error) {
      console.log('Error fetching expert:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Implement the logic to save expert availability by expertname
    const { availability } = req.body;
    console.log(`received date ${availability}`)
    // Connect to the MongoDB Atlas cluster
    const { db } = await connectToDatabase();

    // Find the expert by expertname
    await db.collection('Experts').updateOne({ expertname: expertname }, {
      $set: {
        // availability: req.body.availability,
      }
    });

    return res.json({ message: 'Expert availability saved successfully' });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};

export default expertAvailabilityHandler;
