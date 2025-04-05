
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../TaskFormSchema';
import { BellRing } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskReminderFieldProps {
  form: UseFormReturn<TaskFormValues>;
  showReminderField: boolean;
  setShowReminderField: (show: boolean) => void;
}

export const TaskReminderField: React.FC<TaskReminderFieldProps> = ({ 
  form, showReminderField, setShowReminderField 
}) => {
  const watchDueDate = form.watch('dueDate');
  
  return (
    <>
      <div className="flex items-center space-x-2 my-4">
        <Checkbox
          checked={showReminderField}
          onCheckedChange={() => setShowReminderField(!showReminderField)}
          id="enableReminder"
        />
        <label htmlFor="enableReminder" className="text-sm font-medium cursor-pointer">
          Set reminder before the due time
        </label>
      </div>

      {showReminderField && (
        <FormField
          control={form.control}
          name="reminderTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <BellRing className="h-4 w-4" />
                Reminder Time
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type="time" 
                    placeholder="Set reminder time" 
                    {...field}
                    disabled={!watchDueDate}
                  />
                  <BellRing className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Notification will be sent at this time on the due date
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
