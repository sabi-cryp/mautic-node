// Import necessary modules
const express = require('express');
const axios = require('axios');

// Create an Express application
const app = express();
const port = 30003;

// Add middleware to parse JSON data
app.use(express.json());

// Define a route to create a new client in Mautic
app.post('/create_client_in_mautic', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Make a POST request to the Mautic API endpoint for creating contacts
    const mauticResponse = await axios.post('https://your-mautic-instance/api/contacts/new', {
      firstname: name,
      email: email,
    });

    // Handle Mautic API response here
    console.log('Mautic API Response:', mauticResponse.data);

    res.json({ message: 'Client created successfully in Mautic', mauticResponse });
  } catch (error) {
    console.error('Error creating client in Mautic:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
