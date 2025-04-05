
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent
} from '@/components/ui/popover';
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { TaskStatus as TaskStatusType } from '@/types/task';

interface TaskStatusProps {
  taskId: string;
  currentStatus?: TaskStatusType;
  updateTask: (id: string, updates: { status: TaskStatusType }) => void;
}

export const TaskStatus: React.FC<TaskStatusProps> = ({ 
  taskId, 
  currentStatus = 'not-started',
  updateTask
}) => {
  const getStatusProgressValue = (status: TaskStatusType): number => {
    switch (status) {
      case 'not-started': return 0;
      case 'in-progress': return 25;
      case 'half-done': return 50;
      case 'almost-done': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };
  
  const getStatusLabel = (status: TaskStatusType): string => {
    switch (status) {
      case 'not-started': return 'Not Started (0%)';
      case 'in-progress': return 'In Progress (25%)';
      case 'half-done': return 'Half Done (50%)';
      case 'almost-done': return 'Almost Done (75%)';
      case 'completed': return 'Completed (100%)';
      default: return 'Not Started (0%)';
    }
  };
  
  const getProgressBarColor = (status: TaskStatusType): string => {
    switch (status) {
      case 'not-started': return 'bg-gray-300';
      case 'in-progress': return 'bg-blue-500';
      case 'half-done': return 'bg-yellow-500';
      case 'almost-done': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const handleStatusChange = (newStatus: TaskStatusType) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-full px-1 hover:bg-transparent"
        >
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex justify-between text-xs">
              <span className="text-gray-600">Status:</span>
              <span className="text-gray-600">{getStatusProgressValue(currentStatus)}%</span>
            </div>
            <Progress 
              value={getStatusProgressValue(currentStatus)} 
              className={`h-2 ${getProgressBarColor(currentStatus)}`}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Update Status</h4>
          <RadioGroup 
            defaultValue={currentStatus} 
            onValueChange={(value) => handleStatusChange(value as TaskStatusType)}
          >
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="not-started" id="not-started" />
              <Label htmlFor="not-started">Not Started (0%)</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="in-progress" id="in-progress" />
              <Label htmlFor="in-progress">In Progress (25%)</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="half-done" id="half-done" />
              <Label htmlFor="half-done">Half Done (50%)</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="almost-done" id="almost-done" />
              <Label htmlFor="almost-done">Almost Done (75%)</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="completed" id="completed" />
              <Label htmlFor="completed">Completed (100%)</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};
