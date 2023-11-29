// Import necessary modules
const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');

// Create an Express application
const app = express();
const port = 30003;

// Add middleware to parse JSON data
app.use(express.json());

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'db_host',
  user: 'db_user',
  password: 'db_password',
  database: 'db_name',
  port: 3307,
});

// Check if the connection to MySQL is successful
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Define a route to create a new client in Mautic and store in the database
app.post('/create_client_in_mautic', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Make a POST request to the Mautic API endpoint for creating contacts
    const mauticResponse = await axios.post('https://your-mautic-instance/api/contacts/new', {
      firstname: name,
      email: email,
    });

    // Store client data in the MySQL database
    const insertQuery = 'INSERT INTO clients (name, email) VALUES (?, ?)';
    connection.query(insertQuery, [name, email], (error, results) => {
      if (error) {
        console.error('Error storing client in the database:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Client stored in the database:', results);
        res.json({ message: 'Client created successfully in Mautic and stored in the database', mauticResponse });
      }
    });
  } catch (error) {
    console.error('Error creating client in Mautic:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
