import request from 'supertest'; // Import supertest for HTTP requests
import createApp from '../server.js'; // Import your app factory
import mongoose from 'mongoose'; // Import mongoose for DB connection
import { MongoMemoryServer } from 'mongodb-memory-server'; // In-memory MongoDB server
import User from '../models/userModel.js'; // Import User model

describe('User Controller', () => {
  let mongoServer;
  let app;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    app = await createApp();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    console.log('Register response:', res.body); // Debug output
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('token');
    expect(res.body.username).toBe('testuser');
    expect(res.body.email).toBe('test@example.com');
  });

  it('should login an existing user', async () => {
    // Pre-create a user with hashed password
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123', // Hashed by pre-save hook
    });

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    console.log('Login response:', res.body); // Debug output
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toBe('test@example.com');
  });

  it('should not register a user with invalid data', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'te', // Too short
        email: 'invalid-email', // Invalid email format
        password: '123', // Too short
      });
    console.log('Invalid register response:', res.body); // Debug output
    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });
});