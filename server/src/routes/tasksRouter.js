const express = require('express');
const tasksController = require('../controllers/tasksController');

const tasksRouter = express.Router();

tasksRouter
  .route('/')
  .get(tasksController.getTasks)
  .post(tasksController.createTask)
  .delete(tasksController.deleteCompletedTasks);


  tasksRouter
  .route('/:taskId')
  .delete(tasksController.deleteTask)
  .patch(tasksController.editTask);

module.exports = tasksRouter;
