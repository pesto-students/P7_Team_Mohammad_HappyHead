const { connectToDatabase } = require('../../../../utils/mongodb')
const ObjectId = require('mongodb').ObjectId;

const expertProfileHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {

      const expertname = req.query.expertname;

      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      let expert = await db.collection('Experts').findOne({ expertname: expertname });

      // // If user is not found, create a dummy user
      // if (!expert) {
      //   const dummyExpert = {
      //     name: 'Mr. Senthil Kumar',
      //     email: 'senthil@example.com',
      //     expertname: 'senthil',
      //     phoneNumber: '9847289592',
      //     qualifications: 'Diploma in Counselling Skills',
      //     yearsOfExperience: 9,
      //     speciality: 'Counselling Psychologist',
      //     consultationFee: 850,
      //     password: 'password',
      //     availability: [
      //       {
      //         day: 'Monday',
      //         date: new Date('2023-07-03'), // July 3, 2023
      //         timeSlots: [
      //           {
      //             startTime: '09:00 AM',
      //             endTime: '10:00 AM',
      //             booked: false
      //           },
      //           {
      //             startTime: '10:00 AM',
      //             endTime: '11:00 AM',
      //             booked: false
      //           },
      //           {
      //             startTime: '02:00 PM',
      //             endTime: '03:00 PM',
      //             booked: false
      //           },
      //           {
      //             startTime: '04:00 PM',
      //             endTime: '05:00 PM',
      //             booked: false
      //           }
      //         ]
      //       },
      //       {
      //         day: 'Tuesday',
      //         date: new Date('2023-07-04'), // July 4, 2023
      //         timeSlots: [
      //           {
      //             startTime: '09:00 AM',
      //             endTime: '10:00 AM',
      //             booked: false
      //           },
      //           {
      //             startTime: '10:00 AM',
      //             endTime: '11:00 AM',
      //             booked: false
      //           },
      //           {
      //             startTime: '02:00 PM',
      //             endTime: '03:00 PM',
      //             booked: false
      //           },
      //           {
      //             startTime: '04:00 PM',
      //             endTime: '05:00 PM',
      //             booked: false
      //           }
      //         ]
      //       },
      //       {
      //         day: 'Wednesday',
      //         date: new Date('2023-07-05'), // July 5, 2023
      //         timeSlots: [
      //           {
      //             startTime: '09:00 AM',
      //             endTime: '10:00 AM',
      //             booked: false
      //           },
      //           {
      //             startTime: '10:00 AM',
      //             endTime: '11:00 AM',
      //             booked: false
      //           },
      //           {
      //             startTime: '02:00 PM',
      //             endTime: '03:00 PM',
      //             booked: false
      //           },
      //           {
      //             startTime: '04:00 PM',
      //             endTime: '05:00 PM',
      //             booked: false
      //           }
      //         ]
      //       },
      //     ]
      //   };


      //   // Insert the dummy user into the database
      //   await db.collection('Experts').insertOne(dummyExpert);

      //   // Set the user variable to the created dummy expert
      //   expert = dummyExpert;
      // }

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
          name: req.body.name,
          expertname: req.body.expertname,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          qualifications: req.body.qualifications,
          yearsOfExperience: req.body.phoneNumber,
          speciality: req.body.qualifications,
          consultationFee: req.body.consultationFee,
          password: req.body.password,
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
