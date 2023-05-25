const { connectToDatabase } = require('../../../../utils/mongodb')
const ObjectId = require('mongodb').ObjectId;

const userProfileHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
     const username = req.query.username;

      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      let user = await db.collection('Users').findOne({ username: username });
      // console.log(user)
      // // If user is not found, create a dummy user
      // if (!user) {
      //   const dummyUser = {
      //     name: 'John Doe',
      //     username: 'johndoe',
      //     email: 'johndoe@example.com',
      //     phonenumber: '1234567890',
      //     dob: '1990-01-01',
      //     toolsCompleted: [
      //       { type: 1 },
      //       { type: 2 },
      //       { type: 3 },
      //       // Add more tool entries as needed
      //     ],
      //     answers: {
      //       question: 'Sample question',
      //       answers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
      //       recommendations: ['Recommendation 1', 'Recommendation 2', 'Recommendation 3', 'Recommendation 4', 'Recommendation 5', 'Recommendation 6', 'Recommendation 7', 'Recommendation 8', 'Recommendation 9', 'Recommendation 10', 'Recommendation 11', 'Recommendation 12', 'Recommendation 13', 'Recommendation 14', 'Recommendation 15', 'Recommendation 16', 'Recommendation 17', 'Recommendation 18', 'Recommendation 19', 'Recommendation 20', 'Recommendation 21', 'Recommendation 22', 'Recommendation 23', 'Recommendation 24', 'Recommendation 25'],
      //     },
      //   };

      //   // Insert the dummy user into the database
      //   await db.collection('Users').insertOne(dummyUser);

      //   // Set the user variable to the created dummy user
      //   user = dummyUser;
      // }
     
      // Send the user profile data as the response
      res.status(200).json(user);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { username, ...updatedProfile } = req.body;

      // Connect to the MongoDB Atlas cluster
      let { db } = await connectToDatabase();
     
      // Update the user profile in the database
      await db.collection('Users').updateOne({ username: username }, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phonenumber: req.body.phonenumber,
          dob: req.body.dob,
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
