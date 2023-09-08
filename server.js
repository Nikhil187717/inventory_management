const express = require('express');
const session = require('express-session');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware for session management
app.use(session({
    secret: 'mysecretkey', // Change this to a secret key for production use
    resave: false,
    saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'your_database_name',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.username) {
        return next();
    }
    res.redirect('/login');
};

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Replace with your SQL query for user authentication
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.send('Error occurred while authenticating');
        } else if (results.length === 1) {
            req.session.username = username; // Store the username in the session
            res.redirect('/inventory');
        } else {
            res.send('Invalid username or password');
        }
    });
});

// Serve the dashboard page (protected)
app.get('/inventory', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/inventory.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
