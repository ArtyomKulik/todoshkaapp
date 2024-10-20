const tasksService = require('../services/tasksService');

class TasksController {
  constructor(service) {
    this.service = service;
  }

  getTasks = (req, res) => {
    this.service.getTasks().then((data) => res.json(data));
  };

  createTask = async (req, res) => {
    try {
      const newTask = await this.service.addTask({
        ...req.body
      });
      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

  deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const success = await this.service.deleteTask(taskId);
    res.sendStatus(success ? 204 : 500);
  };

  deleteCompletedTasks = async (req, res) => {
    const success = await this.service.deleteCompletedTasks();
    res.sendStatus(success ? 204 : 500);
  };

  editTask = async (req, res) => {
    const { taskId } = req.params;
    const updatedTask = await this.service.editTask(req.body, taskId);
    res.json(updatedTask);
  };


}

const tasksController = new TasksController(tasksService);

module.exports = tasksController;
