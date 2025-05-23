# 🎥 Screen Recorder aka ScreenShare

**Screen Recorder** is a modern, full-stack web application that allows users to **record their screens**, **upload videos**, and **share them publicly or privately**. Built using **Next.js**, this app emphasizes seamless user experience, fast performance, and intuitive UI. Whether you're creating tutorials, walkthroughs, or just want to capture a moment on your screen, ScreenShare makes the process simple and efficient.

---

## 🌐 Live Demo

Check out the live version of the app here:

🔗 **LIVE LINK**: [https://screen-recoder-olive.vercel.app/](https://screen-recoder-olive.vercel.app/)

📁 **GitHub Repository**: [https://github.com/ritesh1601/Screen-Recoder](https://github.com/ritesh1601/Screen-Recoder)

---

## 🚀 Features

- 🎬 **Screen Recording**: Record your screen directly from the browser using native APIs.
- 📤 **Video Uploads**: Upload recorded videos to a cloud database via Xata.
- 📺 **Video Playback**: Watch videos with a custom player that supports full-screen and seek.
- 🧑‍💼 **User Authentication**: Secure login/logout with NextAuth (OAuth-ready).
- 🔐 **Personal Profiles**: View your uploaded videos and recordings in your own dashboard.
- 🌍 **Public Sharing**: Each video has a unique shareable URL for easy access and sharing.
- ⚙️ **Responsive Design**: Optimized for desktop, tablet, and mobile viewing.

---

## 🛠️ Tech Stack

| Layer         | Tech Stack                            |
| ------------- | ------------------------------------- |
| Frontend      | Next.js, TypeScript, Tailwind CSS     |
| Backend       | Next.js API Routes, Server Actions    |
| Authentication| NextAuth (Session-based)              |
| Database      | Xata (via Drizzle ORM)                |
| UI Components | Custom-built + React-based Components |
| Hosting       | Vercel                                |

---

---

## 🧩 Key Components

- `RecordScreen.tsx` – Handles screen recording functionality.
- `VideoCard.tsx` – Displays a thumbnail and link to a video.
- `Navbar.tsx` – Persistent navigation bar with login/logout links.
- `useScreenRecording.ts` – Custom React hook for controlling recording logic.
- `VideoPlayer.tsx` – A reusable video playback component.
- `upload/page.tsx` – Page for uploading videos and recording content.

---

## ⚙️ Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ritesh1601/Screen-Recoder.git
cd Screen-Recoder
npm install
```
### 2. Configure Environment Variables
```bash
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
XATA_API_KEY=your-xata-api-key
```
### 3. npm run dev


