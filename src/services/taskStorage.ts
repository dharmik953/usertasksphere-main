import { Task } from "../types/task";
import api from './api';

export const TaskStorage = {
  saveTasks: (userId: string, tasks: Task[]): void => {
    if (!userId) return;
    localStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks));
  },

  loadTasks: (userId: string): Task[] | null => {
    if (!userId) return null;
    
    const storedTasks = localStorage.getItem(`tasks-${userId}`);
    if (!storedTasks) return null;

    try {
      // Parse stored tasks and ensure dates are properly converted
      return JSON.parse(storedTasks, (key, value) => {
        if (key === 'createdAt' || key === 'dueDate') {
          return value ? new Date(value) : null;
        }
        return value;
      });
    } catch (error) {
      console.error('Error parsing tasks:', error);
      return null;
    }
  },

  // New methods to interact with the backend API
  fetchTasks: async (userId: string): Promise<Task[]> => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks from API:', error);
      // Fall back to local storage if API fails
      return TaskStorage.loadTasks(userId) || [];
    }
  },

  saveTaskToAPI: async (task: Partial<Task>): Promise<Task> => {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (error) {
      console.error('Error saving task to API:', error);
      throw error;
    }
  },

  updateTaskInAPI: async (id: string, updates: Partial<Task>): Promise<Task> => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating task in API:', error);
      throw error;
    }
  },

  deleteTaskFromAPI: async (id: string): Promise<void> => {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task from API:', error);
      throw error;
    }
  }
};
