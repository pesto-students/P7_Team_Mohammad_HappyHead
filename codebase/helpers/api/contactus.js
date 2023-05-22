import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Contact schema
const ContactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true, 
    required: true },
  email: { 
    type: String, 
    unique: true, 
    required: true },
  query: { 
    type: String, 
    required: true },
});

// Create the Contact model using the schema
const Contact = mongoose.model('Contact', ContactSchema);


