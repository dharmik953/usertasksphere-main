# Task Management Application

A complete Task Management App built using React for the frontend, Node.js as the backend, and MongoDB for data storage.

## 📹 Demo



[Project Demo](https://drive.google.com/file/d/1bsY0QFlVqn0PFC8uMHL-7m9xUyrX8_9H/view)


## 🚀 Features

- **User Authentication:**
  - Secure user registration and login
  - JWT token-based authentication

- **Task Management:**
  - Create, Read, Update, and Delete tasks
  - Sort tasks based on:
    - Due Date
    - Urgency Level

- **Task Interaction:**
  - Pin and unpin tasks for quick access
  - Toggle tasks as completed or incomplete
  - Visual representation and dynamic updates of task status

## 🛠️ Technology Stack

- **Frontend:** React
- **Backend:** Node.js & Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/dharmik953/usertasksphere-main.git
```

2. **Install dependencies:**
```bash
cd task-management-app
npm install
cd client
npm install
```

3. **Set environment variables:**
Create a `.env` file in the root directory of your project and add:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5032
```

4. **Run the application:**

**Server:**
```bash
npm run dev
```

**Client:**
```bash
cd client
npm start
```

Your app will be available at: `http://localhost:8080`

## 🌱 Future Improvements
- Enhanced user profile management
- Task assignment and collaboration
- Notifications and reminders

---

*Happy Tasking!* 🚀📌

