
import React from 'react';
import { Task } from '@/types/task';
import { cn } from '@/lib/utils';
import { CompleteButton } from './task-item/CompleteButton';
import { TaskContent } from './task-item/TaskContent';
import { TaskBadges } from './task-item/TaskBadges';
import { TaskActions } from './task-item/TaskActions';
import { TaskStatus } from './task-item/TaskStatus';

interface TaskListItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  togglePin: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

const getUrgencyBackgroundColor = (urgency?: string): string => {
  switch (urgency) {
    case 'no-rush': return 'bg-gradient-to-r from-green-50 to-green-100 border-green-200';
    case 'low': return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
    case 'moderate': return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
    case 'high': return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
    case 'critical': return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
    default: return 'bg-white';
  }
};

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  toggleComplete,
  togglePin,
  onEdit,
  onDelete,
  updateTask
}) => {
  return (
    <li
      className={cn(
        "p-4 rounded-lg border transition-all",
        "hover:border-primary/20 hover:shadow-sm",
        task.pinned && "border-l-4 border-l-primary",
        getUrgencyBackgroundColor(task.urgency)
      )}
    >
      <div className="flex items-start gap-3">
        <CompleteButton taskId={task.id} toggleComplete={toggleComplete} completed={task.completed} />
        
        <TaskContent
          title={task.title}
          description={task.description}
          notes={task.notes}
          pinned={task.pinned}
        />
        
        <div className="flex flex-col items-end gap-2">
          <TaskBadges
            urgency={task.urgency}
            category={task.category}
            status={task.status}
            dueDate={task.dueDate}
            dueTime={task.dueTime}
            reminderTime={task.reminderTime}
          />
          
          <TaskStatus 
            taskId={task.id} 
            currentStatus={task.status} 
            updateTask={updateTask} 
          />
          
          <TaskActions 
            task={task}
            togglePin={togglePin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </li>
  );
};

export default TaskListItem;
