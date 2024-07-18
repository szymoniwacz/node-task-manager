# Node Task Manager

A task management application built with Node.js, Express, MongoDB, and Socket.io. This application allows users to sign up, log in, create, update, and delete tasks. It also supports real-time updates using Socket.io.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Real-time updates with Socket.io

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/szymoniwacz/node-task-manager.git
   cd node-task-manager
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   ```sh
   cp .env.example .env
   ```

4. Fill in the `.env` file with your own values

### Running the Application

Start the server:

```sh
node src/app.js
```

The server will start on the port specified in the `.env` file (default is 5000).

### API Endpoints

#### User Authentication

**Sign Up:**

```sh
curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}'
```

**Log In:**

```sh
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123"
}'
```

#### Task Management

**Create Task:**

```sh
curl -X POST http://localhost:5000/api/tasks \
-H "Content-Type: application/json" \
-H "x-auth-token: <your_token>" \
-d '{
  "title": "Sample Task",
  "description": "This is a sample task"
}'
```

**Get Tasks:**

```sh
curl -X GET http://localhost:5000/api/tasks \
-H "x-auth-token: <your_token>"
```

**Update Task:**

```sh
curl -X PUT http://localhost:5000/api/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "x-auth-token: <your_token>" \
-d '{
  "title": "Updated Task",
  "description": "This is an updated task",
  "completed": true
}'
```

**Delete Task:**

```sh
curl -X DELETE http://localhost:5000/api/tasks/<task_id> \
-H "x-auth-token: <your_token>"
```

### Real-Time Updates

The application uses Socket.io for real-time updates. You can connect to the Socket.io server and listen for events like `newTask` and `updateTask`.

### Directory Structure

```
node-task-manager/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── app.js
│   └── config.js
├── public/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
