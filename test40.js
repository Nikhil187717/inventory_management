const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Define an API endpoint to fetch location data and numerical values
app.get('/api/locationData', (req, res) => {
  const startDate = req.query.startDate;

  // Write an SQL query to retrieve data based on the selected date
  const sql = `
    SELECT location, value
    FROM your_table_name
    WHERE date_column = ?
  `;

  db.query(sql, [startDate], (err, result) => {
    if (err) {
      console.error('Error executing SQL query: ' + err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Format the data as needed (convert to JSON)
    const data = {
      labels: result.map(row => row.location),
      datasets: [{
        label: 'Quantity Consumed',
        backgroundColor: "blue",
        data: result.map(row => row.value),
      }],
    };

    // Send the data as a JSON response
    res.json(data);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
