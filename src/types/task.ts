
// Task-related type definitions

// Define Task urgency and category types
export type TaskUrgency = 'no-rush' | 'low' | 'moderate' | 'high' | 'critical';
export type TaskCategory = 'personal' | 'office' | 'side-gig' | 'family' | 'other';
export type TaskStatus = 'not-started' | 'in-progress' | 'half-done' | 'almost-done' | 'completed';

// Define Task type
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  dueDate?: Date;
  dueTime?: string;
  reminderTime?: string;
  urgency?: TaskUrgency;
  category?: TaskCategory;
  status?: TaskStatus;
  pinned?: boolean;
  notes?: string;
}

export interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  addTask: (
    title: string, 
    description: string, 
    dueDate?: Date, 
    dueTime?: string, 
    reminderTime?: string,
    urgency?: TaskUrgency,
    category?: TaskCategory,
    notes?: string
  ) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  togglePin: (id: string) => void;
  scheduleNotifications: () => void;
  requestNotificationPermission: () => Promise<boolean>;
}
