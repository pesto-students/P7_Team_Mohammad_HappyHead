const { connectToDatabase } = require('../../../utils/mongodb');

export const getUserByEmail = async (email) => {
    // Connect to the MongoDB Atlas cluster
  let { db } = await connectToDatabase();

  return await db.collection('Users').findOne({ email: email });
}