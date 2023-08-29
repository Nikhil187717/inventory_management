const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chart_data'
};

// Create a database connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// API endpoint to fetch data
app.get('/api/chart-data', (req, res) => {
  const query = 'SELECT * FROM chart_table'; // Update with your query

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    const chartData = {
      xValues: results.map(row => row.x_value),
      datasets: [
        {
          data: results.map(row => row.dataset1),
          borderColor: 'red',
          fill: false
        },
        {
          data: results.map(row => row.dataset2),
          borderColor: 'green',
          fill: false
        },
        {
          data: results.map(row => row.dataset3),
          borderColor: 'blue',
          fill: false
        }
      ]
    };

    res.json(chartData);
  });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
