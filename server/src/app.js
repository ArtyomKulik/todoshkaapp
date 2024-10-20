const express = require('express');
const morgan = require('morgan');
const tasksRouter = require('./routes/tasksRouter');


const app = express();

app.use(morgan('dev'));
app.use(express.json());


app.use('/api/tasks', tasksRouter);


module.exports = app;
