// Socket implementation module
function connect(io) {
    console.log('Socket.IO module loaded');
    
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        
        // Handle incoming chat messages
        socket.on('message', (data) => {
            console.log('Message received:', data);
            // Broadcast the message to all connected clients
            io.emit('message', data);
        });
        
        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
        
        // Optional: Handle user joining notification
        socket.on('join', (username) => {
            console.log(`${username} joined the chat`);
            socket.broadcast.emit('userJoined', `${username} joined the chat`);
        });
    });
}

module.exports = {
    connect: connect
};
