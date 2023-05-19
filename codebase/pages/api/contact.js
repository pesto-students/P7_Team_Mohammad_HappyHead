import mongoose from 'mongoose';

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Contact schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
});

// Create the Contact model using the schema
const Contact = mongoose.model('Contact', ContactSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, query } = req.body;

      // Check if a Contact document already exists with the given email
      const existingContact = await Contact.findOne({ email });

      if (existingContact) {
        // If a document already exists, return a response with conflict status code
        return res.status(409).json({ message: 'Contact already exists' });
      }

      // Create a new Contact document
      const contact = new Contact({ name, email, query });

      // Save the document to MongoDB Atlas
      await contact.save();

      res.status(200).json({ message: 'Form submission successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Return a response with method not allowed status code for non-POST requests
    res.status(405).json({ message: 'Method not allowed' });
  }
}
