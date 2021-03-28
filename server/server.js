const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('./config/connection');

// middle wares
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.send(`success`));

// Routes
const userRoute = require('./routes/users');
const profileRoute = require('./routes/profile');
const postRoute = require('./routes/posts');

// passport middle ware + passport config file
app.use(passport.initialize());
require('./config/passport');

app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postRoute);

// Listening to port
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => console.log(`listening to port ${port}`));
