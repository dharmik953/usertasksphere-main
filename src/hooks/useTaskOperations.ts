import { useState, useEffect } from 'react';
import { Task, TaskUrgency, TaskCategory } from '../types/task';
import { generateId } from '../utils/taskUtils';
import { TaskStorage } from '../services/taskStorage';
import { toast } from 'sonner';
import { TaskService } from '../services/api';

interface UseTaskOperationsProps {
  userId: string | undefined;
}

export const useTaskOperations = ({ userId }: UseTaskOperationsProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTask = async (
    title: string, 
    description: string, 
    dueDate?: Date, 
    dueTime?: string, 
    reminderTime?: string,
    urgency?: TaskUrgency,
    category?: TaskCategory,
    notes?: string
  ) => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const newTask: Task = {
        id: generateId(),
        title,
        description,
        completed: false,
        userId,
        createdAt: new Date(),
        dueDate,
        dueTime,
        reminderTime,
        urgency,
        category,
        status: 'not-started',
        notes,
      };
      
      // Try to save to API first
      try {
        const savedTask = await TaskService.createTask(newTask);
        setTasks(prevTasks => [savedTask, ...prevTasks]);
      } catch (error) {
        // Fallback to local storage if API fails
        setTasks(prevTasks => [newTask, ...prevTasks]);
        console.error('Failed to save task to API, using local storage instead:', error);
      }
      
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    setIsLoading(true);
    try {
      // Try to update via API first
      try {
        await TaskService.updateTask(id, updates);
      } catch (error) {
        console.error('Failed to update task via API, using local storage instead:', error);
      }
      
      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, ...updates } : task
        )
      );
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      // Try to delete via API first
      try {
        await TaskService.deleteTask(id);
      } catch (error) {
        console.error('Failed to delete task via API, using local storage instead:', error);
      }
      
      // Update local state
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = async (id: string) => {
    setIsLoading(true);
    try {
      // Try to toggle via API first
      try {
        await TaskService.toggleComplete(id);
      } catch (error) {
        console.error('Failed to toggle task completion via API, using local storage instead:', error);
      }
      
      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? 
          { ...task, 
            completed: !task.completed, 
            status: !task.completed ? 'completed' : 'not-started'  
          } : task
        )
      );
    } catch (error) {
      toast.error('Failed to update task status');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePin = async (id: string) => {
    setIsLoading(true);
    try {
      // Try to toggle via API first
      try {
        await TaskService.togglePin(id);
      } catch (error) {
        console.error('Failed to toggle task pin via API, using local storage instead:', error);
      }
      
      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, pinned: !task.pinned } : task
        )
      );
    } catch (error) {
      toast.error('Failed to pin/unpin task');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks from API or localStorage on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        // Try to fetch from API first
        try {
          const apiTasks = await TaskService.getTasks();
          setTasks(apiTasks);
        } catch (error) {
          // Fallback to localStorage if API fails
          console.error('Failed to fetch tasks from API, using local storage instead:', error);
          const storedTasks = TaskStorage.loadTasks(userId);
          if (storedTasks) {
            setTasks(storedTasks);
          }
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, [userId]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (userId && tasks.length > 0) {
      TaskStorage.saveTasks(userId, tasks);
    }
  }, [tasks, userId]);

  return {
    tasks,
    setTasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    togglePin,
  };
};
