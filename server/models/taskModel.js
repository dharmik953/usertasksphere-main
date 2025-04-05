import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    dueDate: { type: Date },
    dueTime: { type: String },
    reminderTime: { type: String },
    urgency: { type: String, enum: ['no-rush', 'low', 'moderate', 'high', 'critical'] },
    category: { type: String, enum: ['personal', 'office', 'side-gig', 'family', 'other'] },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'half-done', 'almost-done', 'completed'],
      default: 'not-started'
    },
    pinned: { type: Boolean, default: false },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
