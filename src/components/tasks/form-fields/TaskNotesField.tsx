
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../TaskFormSchema';
import { FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface TaskNotesFieldProps {
  form: UseFormReturn<TaskFormValues>;
}

export const TaskNotesField: React.FC<TaskNotesFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Notes
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Additional notes (optional)"
              className="resize-none"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
