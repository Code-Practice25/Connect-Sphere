---

## 🧩 Split Overview

### 🔷Parinay Raya: Focus on Secure Messaging

> Think WhatsApp clone logic

**Frontend Tasks (React):**

- Chat UI (Inbox, individual chat screen)
- Message bubble components (sent/received)
- Typing indicator, online status
- Socket.io frontend integration
- Chat page routing & layout

**Backend Tasks (Node/Express):**

- Chat and message models (Chat.js, Message.js)
- Chat & message APIs:
  - Create chat, send message, fetch messages
- Real-time logic with Socket.io server:
  - Join room, send/receive message
  - Message seen status, typing events
- Message encryption (optional)

---

### 🔷 Aditya Aerpule: Focus on Feed, Posts, and Stories

> Think Facebook + Instagram Stories logic

**Frontend Tasks (React):**

- News Feed UI (scrollable post list)
- Story bar carousel (top stories like Instagram)
- Post creation & upload UI
- Story creation popup
- Like, comment, and delete post UI
- Post/stories routing & layout

**Backend Tasks (Node/Express):**

- Post and story models (Post.js, Story.js)
- APIs:
  - Create/fetch/delete post
  - Like/comment endpoints
  - Create/fetch/delete story
- MongoDB TTL Index for stories auto-expiry
- Cloudinary/Firebase integration for image uploads

---

## 🤝 Shared or Collaborative Tasks

Work together on:

- **User Authentication:**
  - Login, signup, JWT, password hashing
- **User Profile:**
  - Profile view/edit, followers/following
- **UI Design System:**
  - Shared components (buttons, modals, inputs)
  - Tailwind CSS setup
- **Deployment:**
  - Frontend → Netlify / Vercel
  - Backend → Render / Railway / Cyclic
- **Testing & Debugging:**
  - Each of you tests each other’s module
  - Write README together

---

## 🧪 Bonus Collaboration Tips

- Use **GitHub with branches** (e.g., `messaging`, `feed-feature`)
- Setup **Trello or Notion** board for task tracking
- Use **shared `.env.example` file** for environment consistency
- Have **integration checkpoints** (e.g., "Day 4 – Integrate messaging and user profile")

---