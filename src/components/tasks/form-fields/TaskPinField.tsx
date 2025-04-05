
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../TaskFormSchema';
import { Pin } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskPinFieldProps {
  form: UseFormReturn<TaskFormValues>;
}

export const TaskPinField: React.FC<TaskPinFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="pinned"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="flex items-center gap-1">
              <Pin className="h-4 w-4" />
              Pin this task
            </FormLabel>
            <p className="text-sm text-muted-foreground">
              Pinned tasks always appear at the top of your list
            </p>
          </div>
        </FormItem>
      )}
    />
  );
};
