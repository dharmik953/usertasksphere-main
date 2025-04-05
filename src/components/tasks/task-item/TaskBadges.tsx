
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BellRing, Flame, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { TaskUrgency } from '@/types/task';

interface TaskBadgesProps {
  urgency?: TaskUrgency;
  category?: string;
  status?: string;
  dueDate?: Date;
  dueTime?: string;
  reminderTime?: string;
}

export const TaskBadges = ({
  urgency,
  category,
  status,
  dueDate,
  dueTime,
  reminderTime
}: TaskBadgesProps) => {
  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return null;
    return format(new Date(date), 'MMM dd');
  };

  // Determine if a task is due soon (within 2 days)
  const isTaskDueSoon = (dueDate?: Date) => {
    if (!dueDate) return false;
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    return new Date(dueDate) <= twoDaysFromNow && new Date(dueDate) >= now;
  };

  const getUrgencyColor = (urgency?: TaskUrgency): string => {
    switch(urgency) {
      case 'no-rush': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300';
      case 'low': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300';
      case 'moderate': return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300';
      case 'high': return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300';
      case 'critical': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300';
    }
  };

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

  const getStatusLabel = (status?: string): string => {
    switch(status) {
      case 'not-started': return 'Not Started';
      case 'in-progress': return 'In Progress';
      case 'half-done': return 'Half Done';
      case 'almost-done': return 'Almost Done';
      case 'completed': return 'Completed';
      default: return 'Not Started';
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {urgency && (
        <Badge 
          variant="outline"
          className={cn("flex items-center gap-1", getUrgencyColor(urgency as TaskUrgency))}
        >
          <Flame className="h-3 w-3" />
          {urgency === 'critical' ? 'URGENT' : urgency}
        </Badge>
      )}
      {category && (
        <Badge 
          variant="outline"
          className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-300"
        >
          <Tag className="h-3 w-3" />
          {getCategoryLabel(category)}
        </Badge>
      )}
      {status && status !== 'not-started' && (
        <Badge 
          variant="outline"
          className="flex items-center gap-1 bg-green-50 text-green-700 border-green-300"
        >
          {getStatusLabel(status)}
        </Badge>
      )}
      {dueDate && (
        <Badge 
          variant={isTaskDueSoon(dueDate) ? "destructive" : "secondary"}
          className="flex items-center gap-1"
        >
          <Calendar className="h-3 w-3" />
          {formatDate(dueDate)}
        </Badge>
      )}
      {dueTime && (
        <Badge 
          variant="outline"
          className="flex items-center gap-1"
        >
          <Clock className="h-3 w-3" />
          {dueTime}
        </Badge>
      )}
      {reminderTime && (
        <Badge 
          variant="outline"
          className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-300"
        >
          <BellRing className="h-3 w-3" />
          {reminderTime}
        </Badge>
      )}
    </div>
  );
};
