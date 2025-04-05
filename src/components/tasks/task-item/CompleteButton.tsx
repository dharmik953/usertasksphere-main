
import React from 'react';
import { Circle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompleteButtonProps {
  taskId: string;
  toggleComplete: (id: string) => void;
  completed?: boolean;
  isLoading?: boolean;
}

export const CompleteButton = ({ 
  taskId, 
  toggleComplete, 
  completed = false,
  isLoading = false
}: CompleteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`mt-0.5 h-6 w-6 rounded-full hover:bg-primary/10 hover:text-primary ${completed ? 'border-green-500 text-green-500' : 'border border-gray-200'}`}
      onClick={() => toggleComplete(taskId)}
      disabled={isLoading}
    >
      {completed ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Circle className="h-4 w-4" />
      )}
      <span className="sr-only">{completed ? 'Mark as incomplete' : 'Mark as complete'}</span>
    </Button>
  );
};
