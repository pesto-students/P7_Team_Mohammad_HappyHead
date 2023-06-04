const { connectToDatabase } = require('../../../../utils/mongodb');

const expertAvailabilityHandler = async (req, res) => {
  const { expertname } = req.query;

  if (req.method === 'GET') {
    try {
      const { date } = req.query;
      console.log(`received date ${date}`)
      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the expert by expertname
      const expert = await db.collection('Experts').findOne({ expertname: expertname });

      if (!expert) {
        return res.status(404).json({ error: 'Expert not found' });
      }

      // Find the availability object that matches the date
      
      const availability = expert.availability.find((item) => {
        const itemDate = new Date(item.date);
        // console.log(itemDate)
        return itemDate.getTime() === new Date(date).getTime();
      });
      
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

    // Replace this with your own logic to save expert's availability
    saveExpertAvailability(expertname, availability);

    return res.json({ message: 'Expert availability saved successfully' });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};

export default expertAvailabilityHandler;

// Helper function to save expert availability
function saveExpertAvailability(expertname, availability) {
  // Implement the logic to save expert's availability
  // You can update the database or perform any required operations
}
