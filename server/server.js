const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Import our modules
const sockets = require('./sockets');
const listen = require('./listen');

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO instance with CORS configuration
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Initialize socket handling
sockets.connect(io);

// Start the server
listen.start(server);

console.log('Chat server starting...');
