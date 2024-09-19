const socketio = require('socket.io');

function setupSocketIO(server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on('taskUpdate', (task) => {
      io.emit('taskUpdate', task); 
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

module.exports = setupSocketIO;
