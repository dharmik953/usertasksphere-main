
// src/services/notificationService.ts
import { Task } from '../types/task';

export const NotificationService = {
  /**
   * Request notification permission from the user
   * @returns Promise<boolean> - Whether permission was granted
   */
  requestPermission: async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.error('This browser does not support desktop notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  },

  /**
   * Schedule notifications for tasks with reminders
   * @param tasks - Array of tasks to schedule notifications for
   */
  scheduleTaskNotifications: (tasks: Task[]): void => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    // Clear any existing scheduled notifications
    // This is a simplified approach - in a real app you would track notification IDs
    const now = new Date();

    // Find tasks with due dates and reminder times that haven't been completed
    const tasksWithReminders = tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      task.reminderTime && 
      new Date(task.dueDate) >= now
    );

    tasksWithReminders.forEach(task => {
      if (!task.dueDate || !task.reminderTime) return;

      const dueDate = new Date(task.dueDate);
      
      // Parse reminder time (HH:MM)
      const [hours, minutes] = task.reminderTime.split(':').map(Number);
      
      // Set the reminder date
      const reminderDate = new Date(dueDate);
      reminderDate.setHours(hours, minutes, 0, 0);

      // Only schedule if the reminder time is in the future
      if (reminderDate > now) {
        const timeUntilReminder = reminderDate.getTime() - now.getTime();
        
        // Schedule the notification
        setTimeout(() => {
          NotificationService.showNotification({
            title: `Reminder: ${task.title}`,
            body: task.description || 'Task due soon!',
            icon: '/favicon.ico'
          });
        }, timeUntilReminder);
      }
    });
  },

  /**
   * Show a notification
   * @param options - Notification options
   */
  showNotification: (options: { title: string, body: string, icon?: string }): void => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    try {
      new Notification(options.title, {
        body: options.body,
        icon: options.icon
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }
};
