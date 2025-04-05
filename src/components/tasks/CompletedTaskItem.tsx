
import React from 'react';
import { Task } from '@/types/task';
import { Check, Trash, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';

interface CompletedTaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const CompletedTaskItem: React.FC<CompletedTaskItemProps> = ({
  task,
  toggleComplete,
  onDelete
}) => {
  const getCategoryLabel = (category?: string): string => {
    switch(category) {
      case 'personal': return 'Personal';
      case 'office': return 'Office';
      case 'side-gig': return 'Side Gig';
      case 'family': return 'Family';
      case 'other': return 'Other';
      default: return 'Uncategorized';
    }
  };

  return (
    <li
      className={cn(
        "p-4 bg-gray-50 rounded-lg border border-gray-100",
        task.pinned && "border-l-4 border-l-primary"
      )}
    >
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="mt-0.5 h-6 w-6 rounded-full bg-primary/10 text-primary"
          onClick={() => toggleComplete(task.id)}
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Mark as incomplete</span>
        </Button>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {task.pinned && (
                <Pin className="h-3 w-3 text-primary" />
              )}
              <h3 className="font-medium text-gray-500 line-through line-clamp-1">{task.title}</h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {task.category && (
                <Badge 
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-100 text-gray-500 border-gray-300"
                >
                  <Tag className="h-3 w-3" />
                  {getCategoryLabel(task.category)}
                </Badge>
              )}
            </div>
          </div>
          {task.description && (
            <p className="text-gray-400 text-sm mt-1 line-clamp-1 line-through">{task.description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CompletedTaskItem;
