
# 🌐 Connect-Sphere

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Code-Practice25/Connect-Sphere?style=social)
![GitHub forks](https://img.shields.io/github/forks/Code-Practice25/Connect-Sphere?style=social)
![GitHub issues](https://img.shields.io/github/issues/Code-Practice25/Connect-Sphere)
![GitHub license](https://img.shields.io/github/license/Code-Practice25/Connect-Sphere)

**A modern MERN stack social platform combining secure messaging, news feed, and stories**

[Features](#-features) •
[Tech Stack](#%EF%B8%8F-tech-stack) •
[Installation](#%EF%B8%8F-installation) •
[Usage](#%EF%B8%8F-usage) •
[Database Schema](#-database-schema) •
[Contributors](#-contributors)

</div>

---

## 📋 Overview

Connect-Sphere is a comprehensive social media application built on the MERN stack that combines:

- **Secure, real-time messaging** similar to WhatsApp
- **Classic-style news feed** reminiscent of traditional Facebook
- **24-hour stories** inspired by Instagram

The platform enables users to chat securely, share posts, and express themselves through ephemeral stories — all within a single, cohesive user experience.

![Connect-Sphere Banner](https://res.cloudinary.com/deoegf9on/image/upload/v1746283031/logo_dt52ic.png)

## ✨ Features

### 🔐 Secure Messaging
- Real-time messaging with Socket.io
- Message delivery & read receipts
- Typing indicators
- Media sharing capabilities
- Optional end-to-end encryption

### 📰 News Feed
- Multi-media posts (text, images, videos)
- Interactive engagement (likes, comments)
- Content management
- Intelligent feed sorting (latest, popular)

### 📸 Stories
- Ephemeral content that expires after 24 hours
- Support for various media types
- Viewer tracking
- MongoDB TTL for automatic expiration

### 👤 User Management
- Secure authentication with JWT
- Comprehensive profile customization
- Social graph management (follow/unfollow)
- Privacy controls

### 🌙 User Experience
- Responsive design with mobile-first approach
- Dark/light theme toggle
- Smooth transitions and animations
- Accessibility considerations

## ⚙️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|--------------|
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux) ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express) |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logo=mongoose) |
| **Real-time** | ![Socket.io](https://img.shields.io/badge/-Socket.io-010101?style=flat-square&logo=socket.io) |
| **Authentication** | ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=json-web-tokens) ![bcrypt](https://img.shields.io/badge/-bcrypt-003B57?style=flat-square) |
| **Storage** | ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat-square&logo=cloudinary) or ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) |
| **Deployment** | ![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) ![Render](https://img.shields.io/badge/-Render-46E3B7?style=flat-square&logo=render&logoColor=white) |

</div>

## 📁 Project Structure

```
connect-sphere/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-based modules
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── redux/         # Global state management
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── sockets/           # WebSocket handlers
│   ├── middleware/        # Custom middleware
│   └── server.js          # Entry point
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Code-Practice25/Connect-Sphere.git
   cd Connect-Sphere
   ```

2. **Configure environment variables**

   Create `.env` files in both client and server directories:

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

3. **Install dependencies**

   **Backend:**
   ```bash
   cd server
   npm install
   ```

   **Frontend:**
   ```bash
   cd ../client
   npm install
   ```

## ▶️ Usage

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

3. **Access the application**
   
   Open your browser and navigate to: `http://localhost:3000`

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd ../server
   npm start
   ```

## 🧠 Database Schema

### User
```javascript
{
  username: String,
  email: String,
  password: String,
  profilePic: String,
  bio: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: Date
}
```

### Post
```javascript
{
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  imageURL: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    createdAt: Date
  }],
  createdAt: Date
}
```

### Story
```javascript
{
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageURL: String,
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, expires: '24h' } // TTL index for auto-deletion
}
```

### Chat
```javascript
{
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  createdAt: Date
}
```

### Message
```javascript
{
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  media: String,
  seen: Boolean,
  createdAt: Date
}
```

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Parinay-raya">
        <img src="https://github.com/Parinay-raya.png" width="100px;" alt="Parinay Raya"/>
        <br />
        <sub><b>Parinay Raya</b></sub>
      </a>
      <br />
      <sub>Messaging, Socket.io, Backend</sub>
    </td>
    <td align="center">
      <a href="https://github.com/coder-aadii">
        <img src="https://github.com/coder-aadii.png" width="100px;" alt="Aditya Aerpule"/>
        <br />
        <sub><b>Aditya Aerpule</b></sub>
      </a>
      <br />
      <sub>Feed, Stories, UI/UX</sub>
    </td>
  </tr>
</table>

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

For questions or feedback, please [open an issue](https://github.com/Code-Practice25/Connect-Sphere/issues) or contact the maintainers directly.

---

<div align="center">
  <sub>Built with ❤️ by the Connect-Sphere team</sub>
</div>
</qodoArtifact>