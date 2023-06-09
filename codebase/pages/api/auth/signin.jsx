const { connectToDatabase } = require('../../../utils/mongodb')
const ObjectId = require('mongodb').ObjectId;
const { hashPassword } = require('./authUtil');

const authenticateUser = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const {username, password} = req.body;
      console.log()

      // Connect to the MongoDB Atlas cluster
      const { db } = await connectToDatabase();

      // Find the user by username
      let user = await db.collection('User').findOne({ email: username });
      console.log(`$user`);
      // Send the user profile data as the response
      if (user) {
        const {hashedPassword, salt} = user;
        if(await validatePassword(hashedPassword, salt, password)) {
          res.status(200).json(user);
        } else {
          console.log(`unauthorized user - ${JSON.stringify(user)}`);
          res.status(401).json({error: 'Invalid Credentials'});  
        }        
      } else {
        console.log(`unauthorized user - ${JSON.stringify(user)}`);
        res.status(401).json({error: 'Invalid Credentials'});
      }
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const validatePassword = async (hashedPassword, salt, password) => {
    console.log(`${hashedPassword} - ${salt} - ${password}`);
    const reqPass = await hashPassword(password, salt);

    console.log(`reqHashPassword - ${JSON.stringify(reqPass)}`);
    console.log(`HashedPassword - ${hashedPassword}`);
    return reqPass.hashedPassword === hashedPassword;
}

export default authenticateUser;
