
import api from './api';
import { Task } from '../types/task';

export const TaskService = {
  // Get all tasks for logged in user
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data.map(task => ({
      ...task,
      id: task._id // Ensure frontend uses `id` from `_id`
    }));
  },

  // Create a new task
  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update a task
  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    console.log("Updating Task ID:", id, "With data:", updates);
    const response = await api.put(`/tasks/${id}`, updates);  // Correct URL interpolation
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    console.log("delete Task ID:", id);
    await api.delete(`/tasks/${id}`);
  },

  // Toggle task completion status
  toggleComplete: async (id: string): Promise<Task> => {
    const response = await api.put(`/tasks/${id}/toggle-complete`);
    return response.data;
  },

  // Toggle task pin status
  togglePin: async (id: string): Promise<Task> => {
    const response = await api.put(`/tasks/${id}/toggle-pin`);
    return response.data;
  }
};
