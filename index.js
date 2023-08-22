const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server, {
  cors: {
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"]
  }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', username => {
        console.log("New user", username);
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    }); 

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, username: users[socket.id]})
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
