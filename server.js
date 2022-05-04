// Imports
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// Routers
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

// Setting the app
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Configuring MongoDB
const mongoose = require('mongoose');
const { process_params } = require('express/lib/router');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// Using the routes
app.use('/', indexRouter);
app.use('/authors', authorsRouter);

// Listening on a port
app.listen(process.env.PORT || 3000);
