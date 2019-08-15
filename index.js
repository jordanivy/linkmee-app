const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

const users = require('./routes/users');

//Connect to database
mongoose.connect(config.database);

//Successful connection response
mongoose.connection.on('connected', () => {
  console.log(`connected to database ${config.database}`);
})

mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
})

//Port number
const port = 3000;

//CORS Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
})

//Start server
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

