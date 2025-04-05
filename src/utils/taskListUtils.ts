
import { Task, TaskUrgency } from '@/types/task';

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // First priority: pinned status
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // Second priority: completion status
    if (!a.completed && b.completed) return -1;
    if (a.completed && !b.completed) return 1;
    
    // Third priority: due date (tasks with due dates come first)
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    if (a.dueDate && b.dueDate) {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      if (dateA !== dateB) {
        return dateA - dateB; // Earlier dates first
      }
    }
    
    // Fourth priority: urgency
    if (!a.completed && !b.completed) {
      const urgencyOrder: Record<TaskUrgency, number> = {
        'critical': 0,
        'high': 1,
        'moderate': 2,
        'low': 3,
        'no-rush': 4
      };
      
      const aUrgency = a.urgency || 'no-rush';
      const bUrgency = b.urgency || 'no-rush';
      
      return urgencyOrder[aUrgency as TaskUrgency] - urgencyOrder[bUrgency as TaskUrgency];
    }
    
    // Default: sort by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export const filterTasksByCompletion = (tasks: Task[], completed: boolean): Task[] => {
  return tasks.filter(task => task.completed === completed);
};
