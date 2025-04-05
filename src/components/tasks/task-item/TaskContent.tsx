
import React from 'react';
import { FileText, Pin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskContentProps {
  title: string;
  description?: string;
  notes?: string;
  pinned?: boolean;
}

export const TaskContent = ({
  title,
  description,
  notes,
  pinned
}: TaskContentProps) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        {pinned && (
          <Pin className="h-3 w-3 text-primary" />
        )}
        <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
      </div>
      
      {description && (
        <ScrollArea className="max-h-24 mt-1">
          <p className="text-gray-600 text-sm">{description}</p>
        </ScrollArea>
      )}
      
      {notes && (
        <ScrollArea className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 max-h-20">
          <div className="flex items-center gap-1 text-gray-500 mb-1">
            <FileText className="h-3 w-3" />
            <span className="font-medium">Notes:</span>
          </div>
          {notes}
        </ScrollArea>
      )}
    </div>
  );
};
