const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const csvFilePath = path.join(__dirname, 'users.csv');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Route for registration
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Check if user exists
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.username === username) {
        return res.status(400).send('Username already exists');
      }
    })
    .on('end', () => {
      // Write new user to CSV
      const userData = `\n${username},${password},${email}`;
      fs.appendFile(csvFilePath, userData, (err) => {
        if (err) {
          return res.status(500).send('Error saving user data');
        }
        res.send('Registration successful');
      });
    });
});

// Route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let userFound = false;

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const csvUsername = row.username.trim();
      const csvPassword = row.password.trim();
      if (csvUsername === username.trim() && csvPassword === password.trim()) {
        userFound = true;
      }
    })
    .on('end', () => {
      if (userFound) {
        res.send('Login successful');
      } else {
        res.status(400).send('Invalid username or password');
      }
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
