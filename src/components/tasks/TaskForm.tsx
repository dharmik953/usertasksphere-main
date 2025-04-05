
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTasks } from '@/context/TaskContext';
import { Task, TaskUrgency, TaskCategory } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { taskSchema, TaskFormValues } from './TaskFormSchema';
import { TaskTitleField } from './form-fields/TaskTitleField';
import { TaskDescriptionField } from './form-fields/TaskDescriptionField';
import { TaskCategoriesFields } from './form-fields/TaskCategoriesFields';
import { TaskDateTimeFields } from './form-fields/TaskDateTimeFields';
import { TaskReminderField } from './form-fields/TaskReminderField';
import { TaskNotesField } from './form-fields/TaskNotesField';
import { TaskPinField } from './form-fields/TaskPinField';

interface TaskFormProps {
  mode: 'create' | 'edit';
  task?: Task;
  onSuccess?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ mode, task, onSuccess }) => {
  const { addTask, updateTask, requestNotificationPermission } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReminderField, setShowReminderField] = useState(!!task?.reminderTime);

  const defaultValues: Partial<TaskFormValues> = {
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
    dueTime: task?.dueTime || '',
    reminderTime: task?.reminderTime || '',
    urgency: task?.urgency || undefined,
    category: task?.category || undefined,
    notes: task?.notes || '',
    pinned: task?.pinned || false,
  };

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const onSubmit = async (values: TaskFormValues) => {
    setIsSubmitting(true);

    // Request notification permission if needed
    if (values.reminderTime) {
      await requestNotificationPermission();
    }

    try {
      if (mode === 'create') {
        addTask(
          values.title, 
          values.description || '', 
          values.dueDate, 
          values.dueTime, 
          showReminderField ? values.reminderTime : undefined,
          values.urgency as TaskUrgency,
          values.category as TaskCategory,
          values.notes
        );
        form.reset();
        if (onSuccess) onSuccess(); // Close dialog after successful creation
      } else if (task) {
        updateTask(task.id, {
          ...values,
          reminderTime: showReminderField ? values.reminderTime : undefined,
          urgency: values.urgency as TaskUrgency,
          category: values.category as TaskCategory
        });
        if (onSuccess) onSuccess(); // Close dialog after successful update
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TaskTitleField form={form} />
        <TaskDescriptionField form={form} />
        <TaskCategoriesFields form={form} />
        <TaskDateTimeFields form={form} />
        <TaskReminderField 
          form={form}
          showReminderField={showReminderField}
          setShowReminderField={setShowReminderField}
        />
        <TaskNotesField form={form} />
        <TaskPinField form={form} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === 'create' ? 'Creating...' : 'Updating...'}
            </>
          ) : (
            <>{mode === 'create' ? 'Add Task' : 'Update Task'}</>
          )}
        </Button>
      </form>
    </Form>
  );
};
