import Task from '../models/taskModel.js';
import { protect } from '../middleware/authMiddleware.js';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'user.log' }),
  ],
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const {
    title,
    description,
    dueDate,
    dueTime,
    reminderTime,
    urgency,
    category,
    notes
  } = req.body;

  if (!title) {
    res.status(400);
    res.json({ message: 'Task title is required' });
    return;
  }

  const task = await Task.create({
    title,
    description,
    userId: req.user._id, // Now works because req.user._id is set by middleware
    dueDate,
    dueTime,
    reminderTime,
    urgency,
    category,
    notes
  });

  if (task) {
    logger.info(`Task created: ${task.title} for user: ${req.user.email}`);
    res.status(201).json(task);
  } else {
    logger.error('Invalid task data');
    res.status(400).json({ message: 'Invalid task data' });
  }
};

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  console.log("Task ID from params:", req.params.id);
  console.log("Update Request Body:", req.body);
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    res.json({ message: 'Task not found' });
    return;
  }
  console.log("Task received:", task);
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    res.json({ message: 'Not authorized' });
    return;
  }

  // Sync completed with status
  const updates = { ...req.body };
  if (updates.status === 'completed') {
    updates.completed = true;
  } else if (updates.status && updates.status !== 'completed') {
    updates.completed = false;
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true }
  );
  res.json(updatedTask);
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  const updates = {};

  if (!task) {
    res.status(404);
    res.json({ message: 'Task not found' });
    return;
  }

  // Check if task belongs to user
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    res.json({ message: 'Not authorized' });
    return;
  }

  await Task.deleteOne({ _id: req.params.id });
  res.json({ message: 'Task removed' });
};

const toggleComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      logger.warn(`Task not found: ${req.params.id}`);
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId.toString() !== req.user._id.toString()) {
      logger.warn(`Unauthorized toggle attempt on task: ${req.params.id}`);
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Toggle the completed field and update status accordingly
    task.completed = !task.completed;
    task.status = task.completed ? 'completed' : 'in-progress';
    const updatedTask = await task.save();
    logger.info(`Task completion toggled: ${updatedTask.title}, completed: ${updatedTask.completed}`);
    res.status(200).json(updatedTask);
  } catch (error) {
    logger.error(`Error in toggleComplete: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Toggle task pin status
// @route   PUT /api/tasks/:id/toggle-pin
// @access  Private
const togglePin = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    res.json({ message: 'Task not found' });
    return;
  }

  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    res.json({ message: 'Not authorized' });
    return;
  }

  task.pinned = !task.pinned;
  
  const updatedTask = await task.save();
  res.json(updatedTask);
};

export { createTask, getTasks, updateTask, deleteTask, toggleComplete, togglePin };