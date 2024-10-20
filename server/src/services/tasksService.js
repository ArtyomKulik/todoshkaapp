const { Task } = require('../../db/models');

class TasksService {
  constructor(model) {
    this.model = model;
  }

  async addTask(formData) {
    try {
      const post = await this.model.create({text: formData.text});
      return post
    } catch (error) {
      console.error(error);
    }
   
  }

  getTasks() {
    try {
      return this.model.findAll({ order: [['id', 'DESC']]});
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTask(id) {
    try {
      await this.model.destroy({ where: { id } });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteCompletedTasks() {
    try {
      await this.model.destroy({ where: { status: 'completed' } });
    return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async editTask(newData, id) {
    try {
      const post = await this.model.findByPk(id);
      await post.update(newData);
      const updatedPost = await this.model.findByPk(id);
      return updatedPost;
    } catch (error) {
      console.error(error);
    }
  }


}

const tasksService = new TasksService(Task);

module.exports = tasksService;
