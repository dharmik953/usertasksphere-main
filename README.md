
# Task Management Application

A full-stack task management application built with:

## Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Query

## Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Features
- User authentication (login/signup)
- Create, read, update, delete tasks
- Set task priority levels
- Task categorization
- Due dates and reminders
- Task status tracking
- Pin important tasks

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Setup

1. Clone the repository
2. Install frontend dependencies:
```
npm install
```

3. Setup backend:
```
cd server
npm install
```

4. Create a `.env` file in the server folder based on `.env.example`
5. Start the backend server:
```
cd server
npm start
```

6. Start the frontend development server:
```
npm run dev
```

7. Open http://localhost:5173 in your browser

## Backend API Routes

### User Routes
- POST /api/users/login - Login a user
- POST /api/users - Register a new user
- GET /api/users/profile - Get user profile (requires authentication)

### Task Routes
- GET /api/tasks - Get all tasks for logged in user
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task
- PUT /api/tasks/:id/toggle-complete - Toggle task completion status
- PUT /api/tasks/:id/toggle-pin - Toggle task pin status
