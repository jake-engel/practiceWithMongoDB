const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

app.use(bodyParser.json()); // THIS MUST COME BEFORE routes(app)
routes(app);
app.use((err, req, res, next) => { // THIS MUST COME AFTER routes(app)
  res.status(422).send({ error: err.message });
});

module.exports = app;
