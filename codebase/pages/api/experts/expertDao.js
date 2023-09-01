const { connectToDatabase } = require('../../../utils/mongodb');

export const getExpertByEmail = async (email) => {
    // Connect to the MongoDB Atlas cluster
  let { db } = await connectToDatabase();

  return await db.collection('Experts').findOne({ email: email });
}