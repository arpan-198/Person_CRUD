const express = require('express');
const body = require('body-parser');
const app = express();
const cors = require('cors');


const Person = require('./router/person');

app.use(body.json());
app.use(body.urlencoded({ extended: false }));
app.use(cors());


app.use('/person', Person);


module.exports = app;

