
# Job Management REST APIs

A backend RESTful API for managing jobs, users, and authentication. Built with Node.js, Express, and MongoDB. Supports JWT authentication, role-based access, validation, and pagination.

---

## 🔗 Live API
[https://jobmanagmentrestapis.onrender.com](https://jobmanagmentrestapis.onrender.com)

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Express Validator
- Render (Deployment)

---

## 🗂 Folder Structure

├─ controllers/
├─ middlewares/
├─ models/
├─ routes/
├─ validators/
├─ server.js

## 💻 Installation (Local Setup)
1. Clone the repository:
```bash
git clone https://github.com/chaudharisunny/JobManagmentRestApis.git

2. Navigate to the project folder:
cd JobManagmentRestApis

3. Install dependencies:
npm install

4. Create a .env file with the following variables:
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5000

5.Run the server in development mode:
npm run dev

6.Access APIs at:
http://localhost:5000/api


API Routes Table

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/newuser`       | Create a new user        |
| POST   | `/login`         | User login               |
| POST   | `/admin/signup`  | Register a new admin     |
| POST   | `/admin`         | Admin login              |
| POST   | `/admin/newjob`  | Create a new job (admin) |
| GET    | `/jobs`          | Get all jobs             |
| GET    | `/job/:id`       | Get single job by ID     |
| PUT    | `/updatejob/:id` | Update job by ID         |
| DELETE | `/deletejob/:id` | Delete job by ID         |



