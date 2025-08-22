// Module to start node server listening for requests on port 3000
function start(server) {
    const PORT = process.env.PORT || 3000;
    
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log('Socket.IO server is ready for connections');
    });
}

module.exports = {
    start: start
};
