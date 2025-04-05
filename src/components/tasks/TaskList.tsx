
import React, { useState } from 'react';
import { Task, useTasks } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TaskForm } from './TaskForm';
import { sortTasks, filterTasksByCompletion } from '@/utils/taskListUtils';
import TaskListItem from './TaskListItem';
import CompletedTaskItem from './CompletedTaskItem';
import { ScrollArea } from '@/components/ui/scroll-area';

const TaskList = () => {
  const { tasks, toggleComplete, deleteTask, togglePin, updateTask } = useTasks();
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleEditClick = (task: Task) => {
    setEditTask(task);
  };

  const closeEditDialog = () => {
    setEditTask(null);
  };

  // Sort and filter tasks
  const sortedTasks = sortTasks(tasks);
  const pendingTasks = filterTasksByCompletion(sortedTasks, false);
  const completedTasks = filterTasksByCompletion(sortedTasks, true);

  return (
    <ScrollArea className="h-[calc(100vh-180px)]">
      <div className="space-y-8 animate-fade-in pr-4">
        <section>
          <h2 className="text-xl font-semibold mb-4">Pending Tasks ({pendingTasks.length})</h2>
          {pendingTasks.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500">No pending tasks. Great job!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {pendingTasks.map(task => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  toggleComplete={toggleComplete}
                  togglePin={togglePin}
                  onEdit={handleEditClick}
                  onDelete={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </ul>
          )}
        </section>

        {completedTasks.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Completed Tasks ({completedTasks.length})</h2>
            <ul className="space-y-2">
              {completedTasks.map(task => (
                <CompletedTaskItem
                  key={task.id}
                  task={task}
                  toggleComplete={toggleComplete}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          </section>
        )}

        {/* Edit task dialog */}
        <Dialog open={!!editTask} onOpenChange={(open) => !open && closeEditDialog()}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            {editTask && (
              <TaskForm 
                mode="edit" 
                task={editTask} 
                onSuccess={closeEditDialog} 
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  );
};

export default TaskList;
