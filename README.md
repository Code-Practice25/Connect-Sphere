# 🌐 Connect-Sphere

Connect-Sphere is a modern **MERN stack** social media web application that combines secure, real-time messaging (like WhatsApp) with a classic-style news feed and 24-hour stories (like old Facebook and Instagram). It enables users to **chat securely**, **share posts**, and **express themselves through stories** — all in one sleek platform.

![Connect-Sphere Banner](https://your-banner-image-url.com) <!-- Optional: Add a banner if available -->

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Contributors](#contributors)
- [License](#license)

---

## ✨ Features

### 🔐 Secure Messaging (WhatsApp Style)
- One-on-one real-time messaging using **Socket.io**
- Message delivery & seen status
- Typing indicators
- Media sharing (images/audio)
- Optional: End-to-end encryption (E2EE)

### 📰 News Feed (Old Facebook Style)
- Text/image/video posts
- Like, comment, and delete functionality
- Responsive feed with sorting (latest, popular)

### 📸 24-Hour Stories (Instagram Style)
- Upload short-lived stories (image/video/text)
- Auto-expire after 24 hours (MongoDB TTL)
- Story viewers tracking

### 👤 User Management
- Register/login using **JWT**
- Update profile, bio, and picture
- Follow/unfollow system

### 🌙 Modern UX
- Tailwind CSS-based dark/light theme
- Responsive mobile-first design
- Smooth animations and transitions

---

## ⚙️ Tech Stack

| Layer       | Technology                       |
|-------------|----------------------------------|
| Frontend    | React.js, Redux Toolkit, TailwindCSS |
| Realtime    | Socket.io                        |
| Backend     | Node.js, Express.js              |
| Database    | MongoDB + Mongoose               |
| Authentication | JWT, bcrypt                    |
| File Upload | Cloudinary or Firebase           |
| Deployment  | Netlify (Frontend), Render/Railway (Backend) |

---

## 📁 Folder Structure

```

```
connect-sphere/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-based folders (auth, chat, post, story)
│   │   ├── pages/         # Page components (Home, Messages, Profile)
│   │   ├── services/      # API services
│   │   └── redux/         # Global store config
│   └── public/
├── server/                # Express backend
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── sockets/           # Socket.io handlers
│   ├── middleware/        # JWT auth, error handler, file upload
│   └── server.js          # App entry point
└── README.md
```

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Code-Practice25/Connect-Sphere.git
cd Connect-Sphere
```

### 2. Set up Environment Variables

Create `.env` files in both `client/` and `server/`.

**Server `.env`:**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Client `.env`:**

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### 3. Install Dependencies

**Backend:**

```
cd server
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

---

## ▶️ Usage

### Run Backend:

```
cd server
npm start
```

### Run Frontend:

```bash
cd client
npm start
```

Now go to: `http://localhost:3000`

---

## 🧠 Database Schema Overview

### User

```
{
  "username": "string", 
  "email": "string", 
  "password": "string", 
  "profilePic": "string", 
  "bio": "string",
  "followers": ["userId"], 
  "following": ["userId"]
}
```

### Post

```json
{
  "author": "userId", 
  "content": "string", 
  "imageURL": "string", 
  "likes": ["userId"],
  "comments": [{ "userId": "string", "comment": "string" }], 
  "createdAt": "date"
}
```

### Story

```json
{
  "userId": "string", 
  "imageURL": "string", 
  "createdAt": "date" // TTL for auto-deletion
}
```

### Chat

```json
{
  "members": ["userId1", "userId2"], 
  "lastMessage": "messageId"
}
```

### Message

```json
{
  "chatId": "string", 
  "senderId": "string", 
  "text": "string", 
  "media": "string", 
  "seen": "boolean", 
  "createdAt": "date"
}
```

---

## 👥 Contributors

* **Parinay Raya**
  🔗 [@Code-Practice25](https://github.com/Code-Practice25)
  🛠️ Secure messaging, Socket.io, chat UI, backend APIs

* **\[Your Friend's Name]**
  🔗 \[GitHub Profile Link]
  🛠️ News feed, post/story system, file upload, UI polish

---

## 📄 License

This project is licensed under the **MIT License** - feel free to use, modify, and share!

---

## 🙌 Support or Suggestions?

Feel free to [open an issue](https://github.com/Code-Practice25/Connect-Sphere/issues) or drop a PR if you’d like to contribute or report bugs.

```
