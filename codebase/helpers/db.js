require('dotenv').config()

import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return mongoose.connections[0];
  }

  const uri = process.env.MONGODB_URI;
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}