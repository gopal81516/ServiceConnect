# 🚀 ServiceConnect

![React](https://img.shields.io/badge/Frontend-React-blue.svg)
![Express](https://img.shields.io/badge/Backend-Express.js-green.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-blueviolet)
![Status](https://img.shields.io/badge/Status-Live-success)

> A full-stack service request platform for requesters, responders, and admins. Built using MERN stack with role-based access and deployment-ready architecture.

---

## 🌐 Live Demo

🔗 [https://service-connect-5lo2.vercel.app](https://service-connect-5lo2.vercel.app)  
🔗 Backend: [https://serviceconnect-pyc7.onrender.com](https://serviceconnect-pyc7.onrender.com)

---

## 📂 Folder Structure

ServiceConnect/
│
├── backend/
│ └── serviceconnect-backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
└── frontend/
└── myapp/
├── public/
└── src/
├── components/pages/
│ ├── AdminDashboard.js
│ ├── AdminLogin.jsx
│ ├── UserDashboard.js
│ ├── UserLogin.js
│ ├── UserRegister.js
│ └── Navbar.js

---

## 🔧 Setup Instructions

### ⚙️ Backend

```bash
cd backend/serviceconnect-backend
npm install
# Create a .env file with your MongoDB URI:
# MONGODB_URI=your_mongo_connection
node server.js
🎨 Frontend

cd frontend/myapp
npm install
npm start
✅ Features

    ✍️ User Registration with roles (Requester, Responder, Admin)

    🔐 User Login and role-based redirection

    🧑‍💼 User Dashboard — View own requests and responses

    🛠 Admin Dashboard — Manage all requests, update status, respond

    📊 Role Handling with localStorage

    🌐 Responsive UI with Tailwind CSS

    🚀 Deployed to Render (backend) & Vercel (frontend)

    🔄 Environment switching using .env.development and .env.production

🧪 Testing Checklist
Functionality	Tested
Register as each role	✅
Login and redirect	✅
Create service requests	✅
Admin updates status	✅
Responder submits responses	✅
View responses from user dashboard	✅

📚 Learning Goals & Roadmap
🔧 Feature	📘 You Should Learn
JWT Authentication	Token-based auth, securing APIs
Role-Based Protected Routes	Using JWT in frontend routes
Responder Dashboard	Filtering user type in backend/frontend
Email Notifications	Nodemailer or similar
File Upload	Multer, Cloudinary
Pagination & Search	Query optimization and UI integration
🛠 Deployment Tools
Layer	Platform
Frontend	Vercel
Backend	Render
Database	MongoDB Atlas
🙌 Author

Made with ❤️ by @gopal81516
📜 License

This project is open-source and available under the MIT License