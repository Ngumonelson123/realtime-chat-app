# 💬 Realtime Chat Application

A full-stack realtime chat application built with Node.js, React, Socket.IO, and MongoDB Atlas.

## 🚀 Features

- **User Authentication** - Register and login with JWT tokens
- **Realtime Messaging** - Live chat using Socket.IO
- **Chat Rooms** - Create and join different chat rooms
- **Secure** - Password hashing with bcryptjs
- **Cloud Database** - MongoDB Atlas integration
- **Responsive UI** - React-based frontend

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Realtime communication
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.IO Client** - Realtime client

## 📁 Project Structure

```
realtime-chat-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   └── roomController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Room.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── messageRoutes.js
│   │   └── roomRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Rooms.js
    │   │   └── ChatRoom.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/realtime-chat-app.git
   cd realtime-chat-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room
- `POST /api/rooms/:roomId/join` - Join room
- `POST /api/rooms/:roomId/leave` - Leave room

### Messages
- `GET /api/messages/:roomId` - Get messages for room

## 🧪 Testing

### API Testing with Postman

1. **Register User**
   ```
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json
   
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

2. **Login User**
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

## 🔐 Authentication Flow

1. User registers with username, email, and password
2. Password is hashed using bcryptjs
3. User logs in with email and password
4. JWT token is generated and returned
5. Token is used for protected routes via Authorization header
6. Middleware validates token for protected endpoints

## 🌐 Socket.IO Events

- `connection` - User connects
- `joinRoom` - User joins a chat room
- `sendMessage` - User sends a message
- `receiveMessage` - Broadcast message to room
- `disconnect` - User disconnects

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy backend code
3. Update frontend API base URL

### Frontend (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Nelson Ngumo**
- GitHub: [@nelson-ngumo](https://github.com/nelson-ngumo)
- LinkedIn: [Nelson Ngumo](https://linkedin.com/in/nelson-ngumo)

## 🙏 Acknowledgments

- Socket.IO for realtime communication
- MongoDB Atlas for cloud database
- JWT for secure authentication
- React community for excellent documentation