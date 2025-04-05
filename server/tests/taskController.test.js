import request from 'supertest';
import createApp from '../server.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

describe('Task Controller', () => {
  let mongoServer;
  let app;
  let token;
  let user;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    app = await createApp();

    // Create a user and generate a token
    user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    token = generateToken({ _id: user._id.toString(), email: user.email, username: user.username }); // Plain object
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Test Description',
      });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Task');
    expect(res.body.userId).toBe(user._id.toString());
  });

  it('should not create a task with invalid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '', // Missing required field
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Task title is required');
  });

  it('should get all tasks', async () => {
    await Task.create({ title: 'Test Task', userId: user._id });
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Test Task');
  });

  it('should toggle task completion', async () => {
    const task = await Task.create({ title: 'Test Task', userId: user._id, completed: false });
    const res = await request(app)
      .put(`/api/tasks/${task._id}/toggle-complete`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.status).toBe('completed');
  });
});