import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the server
      const response = await axios.post('/api/contact', { name, email, query });
      console.log(response.data); // Handle the response as desired

      // Clear the form fields
      setName('');
      setEmail('');
      setQuery('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Query"
          fullWidth
          multiline
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}
