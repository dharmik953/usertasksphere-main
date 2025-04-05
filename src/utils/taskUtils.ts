
import { Task, TaskStatus, TaskUrgency } from "../types/task";

// Helper function to generate IDs
export const generateId = (): string => Math.random().toString(36).substring(2, 11);
// Urgency priority (higher number = more urgent)
const urgencyOrder: Record<TaskUrgency, number> = {
  'critical': 5,
  'high': 4,
  'moderate': 3,
  'low': 2,
  'no-rush': 1,
};

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Handle dueDate comparison
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity; // Nulls last
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

    if (dateA !== dateB) {
      return dateA - dateB; // Earlier dates first
    }

    // If dueDates are equal, sort by urgency
    const urgencyA = a.urgency ? urgencyOrder[a.urgency] : 0; // Default to 0 if no urgency
    const urgencyB = b.urgency ? urgencyOrder[b.urgency] : 0;
    return urgencyB - urgencyA; // Higher urgency first
  });
};

// Existing filter function (unchanged)
export const filterTasksByCompletion = (tasks: Task[], completed: boolean): Task[] => {
  return tasks.filter(task => task.completed === completed);
};

// Helper function to create sample tasks
export const createSampleTasks = (userId: string): Task[] => {
  return [
    {
      id: generateId(),
      title: 'Complete project documentation',
      description: 'Finish writing technical docs for the new feature',
      completed: false,
      userId: userId,
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
      dueTime: "14:00",
      reminderTime: "13:00",
      urgency: 'moderate' as TaskUrgency,
      category: 'office',
      status: 'in-progress' as TaskStatus,
      notes: 'Include diagrams and code examples'
    },
    {
      id: generateId(),
      title: 'Set up weekly meeting',
      description: 'Schedule team sync meeting for next sprint planning',
      completed: true,
      userId: userId,
      createdAt: new Date(),
      category: 'office',
      status: 'completed' as TaskStatus
    },
    {
      id: generateId(),
      title: 'Review pull requests',
      description: 'Check and approve pending PRs from the team',
      completed: false,
      userId: userId,
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000), // 1 day from now
      dueTime: "17:00",
      reminderTime: "16:00",
      urgency: 'high' as TaskUrgency,
      category: 'side-gig',
      status: 'not-started' as TaskStatus,
      pinned: true
    },
  ];
};
