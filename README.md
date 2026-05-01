# Team Task Manager

A full-stack Team Task Manager web application built using React, Node.js, Express, and MongoDB.

This application allows teams to manage projects, assign tasks, track progress, and monitor overdue work with role-based access control.

---

## Live Demo

Frontend: https://team-task-manager-production-3741.up.railway.app/

Backend API: https://team-task-manager-etherai.up.railway.app/

---

## GitHub Repository

https://github.com/RudraSingh05/team-task-manager

---

## Features

### Authentication
- User Signup
- User Login
- JWT Authentication
- Password hashing using bcrypt

### Role-Based Access Control
#### Admin
- Create projects
- Create tasks
- Assign tasks to members
- View all tasks
- Dashboard analytics

#### Member
- View assigned tasks only
- Update task status
- Personal dashboard view

### Project Management
- Create project
- View projects
- Team member management

### Task Management
- Create task
- Assign task to users
- Update task status
- Due date support
- Overdue task tracking

### Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Deployment
- Railway
- MongoDB Atlas

---

## Folder Structure

```bash
team-task-manager
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
└── frontend
    ├── app
    │   └── App.jsx
    ├── src
    │   ├── api
    │   ├── context
    │   ├── pages
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/RudraSingh05/team-task-manager.git
cd team-task-manager
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## API Endpoints

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`

### Projects
- GET `/api/projects`
- POST `/api/projects`
- PUT `/api/projects/:id/add-member`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- GET `/api/tasks/dashboard/stats`

### Users
- GET `/api/users`

---

## Usage Flow

### Admin Workflow
1. Register/Login as Admin
2. Create Project
3. Create Task
4. Assign Task to Member
5. Track progress from dashboard

### Member Workflow
1. Register/Login as Member
2. View assigned tasks
3. Update task status
4. Monitor personal dashboard

---

## Author

Rudra Pratap Singh

LinkedIn: https://www.linkedin.com/in/rudra-pratap-singh-cse/

GitHub: https://github.com/RudraSingh05
