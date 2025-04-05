import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Task, TaskUrgency, TaskCategory, TaskContextType } from '../types/task';
import { TaskService } from '../services/taskService';
import { NotificationService } from '../services/notificationService';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create the provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch tasks using React Query
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: TaskService.getTasks,
    enabled: !!user,
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: (newTask: Partial<Task>) => TaskService.createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task added successfully!');
    },
    onError: () => {
      toast.error('Failed to add task.');
    }
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) => 
      TaskService.updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update task.');
    }
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => TaskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete task.');
    }
  });

  // Toggle complete mutation
  const toggleCompleteMutation = useMutation({
    mutationFn: (id: string) => TaskService.toggleComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      toast.error('Failed to update task status.');
    }
  });

  // Toggle pin mutation
  const togglePinMutation = useMutation({
    mutationFn: (id: string) => TaskService.togglePin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      toast.error('Failed to pin/unpin task.');
    }
  });

  const addTask = (
    title: string, 
    description: string, 
    dueDate?: Date, 
    dueTime?: string, 
    reminderTime?: string,
    urgency?: TaskUrgency,
    category?: TaskCategory,
    notes?: string
  ) => {
    if (!user) return;
    
    addTaskMutation.mutate({
      title,
      description,
      dueDate,
      dueTime,
      reminderTime,
      urgency,
      category,
      notes
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    updateTaskMutation.mutate({ id, updates });
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const toggleComplete = (id: string) => {
    toggleCompleteMutation.mutate(id);
  };

  const togglePin = (id: string) => {
    togglePinMutation.mutate(id);
  };
  
  // Check for pending notifications
  useEffect(() => {
    if (tasks.length > 0) {
      scheduleNotifications();
    }
  }, [tasks]);

  // Function to request notification permissions
  const requestNotificationPermission = async (): Promise<boolean> => {
    return NotificationService.requestPermission();
  };

  // Schedule notifications for tasks
  const scheduleNotifications = (): void => {
    NotificationService.scheduleTaskNotifications(tasks);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      isLoading, 
      addTask, 
      updateTask, 
      deleteTask, 
      toggleComplete, 
      togglePin,
      scheduleNotifications,
      requestNotificationPermission
    }}>
      {children}
    </TaskContext.Provider>
  );
};

// Create a hook for using the task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Re-export all the types to keep compatibility with existing imports
export type { Task, TaskUrgency, TaskCategory };
