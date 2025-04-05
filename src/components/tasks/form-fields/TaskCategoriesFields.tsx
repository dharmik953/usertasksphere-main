
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../TaskFormSchema';
import { Flame, Tag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskCategoriesFieldsProps {
  form: UseFormReturn<TaskFormValues>;
}

export const TaskCategoriesFields: React.FC<TaskCategoriesFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="urgency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              Urgency Level
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="no-rush">No Rush</SelectItem>
                <SelectItem value="low">Low Urgency</SelectItem>
                <SelectItem value="moderate">Moderate Urgency</SelectItem>
                <SelectItem value="high">High Urgency</SelectItem>
                <SelectItem value="critical">Critical (Do ASAP)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              Category
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="side-gig">Side Gig</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
