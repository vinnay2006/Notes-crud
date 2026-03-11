📌 Project Overview
CloudNotes is a full-stack personal productivity application that allows users to securely create, manage, and organize their daily tasks or thoughts.

The platform features a secure User Authentication system where individuals can sign up to maintain their private workspace. Once logged in, users have full control over their notes, with all data being persisted in a cloud database and protected by JWT-based authorization.

🛠 Tech Stack
Frontend: React.js, HTML5, CSS3 (Tailwind/Bootstrap), JavaScript
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for Schema modeling)
Authentication: JWT (JSON Web Tokens) & Bcrypt.js (for password hashing)
Tools: Git, GitHub, Postman

✨ Features
Secure Authentication: User registration and login with encrypted passwords.
JWT Protected Routes: Only authenticated users can access their specific notes; unauthorized requests are blocked by middleware.

Full CRUD Functionality:

Create: Quick-add notes with titles and descriptions.
Read: Fetch and display all notes belonging to the logged-in user.
Update: Edit existing notes in real-time.
Delete: Remove notes with a single click.
User-Specific Data: Logic to ensure User A cannot view or edit User B’s notes.

## Folder structure 
My-Notes/
├── backend/                # Node.js & Express Logic
│   ├── middleware/         # fetchuser.js (JWT validation filter)
│   ├── models/             # User.js and Note.js Schemas
│   ├── routes/             # auth.js (Login/Signup) & notes.js (CRUD)
│   └── db.js               # MongoDB connection logic
├── src/                    # Frontend React Architecture
│   ├── components/         # Navbar, NoteItem, AddNote, Home, About
│   ├── context/            # NoteState.js (Global state for CRUD operations)
│   ├── App.js              # Centralized routing & User Auth checks
│   └── index.js            # Entry point
└── public/                 # Static assets & Icons
##Screenshots
<img width="1920" height="1080" alt="Screenshot (501)" src="https://github.com/user-attachments/assets/ac8584e8-36f3-4947-9d33-378281cd2f2e" />
<img width="1920" height="1080" alt="Screenshot (502)" src="https://github.com/user-attachments/assets/871c4ac2-d535-4478-8f58-3683a389a00a" />


