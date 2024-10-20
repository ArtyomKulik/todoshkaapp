import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  TaskApiResponse,
  TaskSubmitType,
  TaskEditType,
  TaskType,
} from '../types/TaskTypes';
import { TaskSchema, TasksSchema } from '../utils/validators';
import apiInstance from './apiInstance';

class TasksService {
  constructor(private readonly api: AxiosInstance) {}

  async getTasks(): Promise<TaskApiResponse> {
    try {
      const { data } = await this.api<TaskApiResponse>('/tasks');
      return TasksSchema.parse(data);
    } catch (error) {
      console.error('Woops:', error);
      throw error;
    }
  }

  async addTask(taskFormData: TaskSubmitType): Promise<TaskType> {
    try {
      const { data } = await this.api.post<TaskType>('/tasks', taskFormData);
      return data;
    } catch (error) {
      console.error('Woops:', error);
      throw error;
    }
  }

  async deleteTask(id: number): Promise<AxiosResponse> {
    try {
      return await this.api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Woops:', error);
      throw error;
    }
  }

  async deleteCompletedTasks(): Promise<AxiosResponse> {
    try {
      return await this.api.delete('/tasks');
    } catch (error) {
      console.error('Woops:', error);
      throw error;
    }
  }

  async editTask(id: TaskType['id'], taskFormData: TaskEditType): Promise<TaskType> {
    try {
      const { data } = await this.api.patch<TaskType>(`/tasks/${id}`, taskFormData);
      return TaskSchema.parse(data);
    } catch (error) {
      console.error('Woops:', error);
      throw error;
    }
  }
}

export default new TasksService(apiInstance);
