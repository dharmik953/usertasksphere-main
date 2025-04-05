
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, Bell } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Header from '@/components/layout/Header';
import { useTasks } from '@/context/TaskContext';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const { scheduleNotifications, requestNotificationPermission } = useTasks();
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    'Notification' in window && Notification.permission === 'granted'
  );

  // Request notification permissions on component mount
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
        scheduleNotifications();
      }
    }
  }, [scheduleNotifications]);

  // Handle notification permission request
  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-medium">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <div className="flex space-x-2">
            {!notificationsEnabled && (
              <Button 
                onClick={handleRequestPermission}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Bell className="h-5 w-5" />
                Enable Notifications
              </Button>
            )}
            <Button 
              onClick={() => setIsAddTaskDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Task
            </Button>
          </div>
        </div>

        <TaskList />
      </main>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <TaskForm mode="create" onSuccess={() => setIsAddTaskDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
