
import React from 'react';
import { Task } from '@/types/task';
import { Pin, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskActionsProps {
  task: Task;
  togglePin: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskActions = ({ 
  task,
  togglePin,
  onEdit,
  onDelete
}: TaskActionsProps) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 text-gray-500",
          task.pinned ? "text-primary hover:text-primary/80" : "hover:text-primary"
        )}
        onClick={() => togglePin(task.id)}
      >
        <Pin className="h-4 w-4" />
        <span className="sr-only">{task.pinned ? "Unpin" : "Pin"}</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-primary"
        onClick={() => onEdit(task)}
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-destructive"
        onClick={() => onDelete(task.id)}
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
};
