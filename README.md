# Live Chat Application 💬

A real-time chat application built with **Angular** frontend and **Node.js** backend using **Socket.io** for live messaging capabilities.

*Workshop 6 - Node and Sockets (Worth 2.5%)*

## 🚀 Features

- ✅ **Real-time messaging** with Socket.io
- ✅ **Multi-user support** - multiple users can chat simultaneously  
- ✅ **User identification** - username-based messaging
- ✅ **Join notifications** - see when users join the chat
- ✅ **Responsive design** - Bootstrap-styled interface
- ✅ **Auto-scroll** - chat automatically scrolls to newest messages
- ✅ **Message timestamps** - see when messages were sent

## 🛠️ Technology Stack

- **Frontend**: Angular 20+ with TypeScript
- **Backend**: Node.js with Express
- **Real-time Communication**: Socket.io
- **Styling**: Bootstrap 5
- **CORS**: Enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v16 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## 🚀 Getting Started

### 1. Install Dependencies

**Frontend dependencies:**

```bash
npm install
```

**Backend dependencies:**

```bash
cd server
npm install
```

### 2. Start the Backend Server

```bash
cd server
node server.js
```

You should see:

```
Chat server starting...
Socket.IO module loaded
Server is running on http://localhost:3000
Socket.IO server is ready for connections
```

### 3. Start the Frontend Development Server

Open a new terminal in the project root:

```bash
ng serve --open
```

The application will automatically open at `http://localhost:4200/`

## 🧪 Testing the Live Chat

### Single User Test

1. Open `http://localhost:4200`
2. Enter a username and click "Join Chat"
3. Send a message to verify basic functionality

### Multi-User Real-Time Test

1. **Open multiple browser windows/tabs** to `http://localhost:4200`
2. **Use different usernames** in each window
3. **Send messages** from different windows
4. **Verify** messages appear instantly in all connected browsers

### Expected Behavior

- Messages appear in real-time across all connected clients
- Join notifications when users connect
- Your messages appear on the right (blue), others on the left (gray)
- Auto-scroll to newest messages
- Responsive design on mobile/desktop

## 📁 Project Structure

```
week6-workshop/
├── src/app/
│   ├── chat/                 # Chat component
│   │   ├── chat.ts          # Component logic
│   │   ├── chat.html        # Template
│   │   └── chat.css         # Styling
│   ├── services/
│   │   └── socket.ts        # Socket.io service
│   └── app.routes.ts        # Routing configuration
├── server/
│   ├── server.js            # Main server file
│   ├── sockets.js           # Socket handling logic
│   ├── listen.js            # Server startup module
│   └── package.json         # Server dependencies
└── README.md
```
