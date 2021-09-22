const actions = require('./src/socket/socket-events');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;

app.use(express.static('build'));
app.get('*', (res,req) => {
  req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const usersRooms = ( ) => {
  const {rooms} = io.sockets.adapter;
  return Object.keys(rooms);
};

const shareRooms = ( ) => {
  console.log("rooms shared");
  io.emit(actions.share, {
    rooms: usersRooms()
  });
};

const leaveRoom = ( socket ) => {
  const {rooms} =  socket;
  rooms.forEach((roomID) => {
    Array.from(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID) => {
      io.to(clientID).emit(actions.removePeer,{ peerID: socket.id });
      socket.emit(actions.removePeer, { peerID: clientID });
    });
    socket.leave(roomID);
  });
  shareRooms();
  console.log("user disconnected, socket id: " + socket.id);
};

io.on('connection', (socket) => {
  shareRooms();

  console.log("user connected, socket id: " + socket.id);

  socket.on(actions.join, (config)=> {
    const {room: roomID} = config;
    const {rooms: joinedRooms} =  socket;

    if (!Array.from(joinedRooms).includes(roomID)) {
      Array.from(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID) => {
        io.to(clientID).emit(actions.addPeer,{
          peerID: socket.id,
          createOffer: false
        });
        socket.emit(actions.addPeer, {
          peerID: clientID,
          createOffer: true
        });
      });
      socket.join(roomID);
      console.log(usersRooms());
    }; 
  });
  socket.on(actions.leave, () => leaveRoom(socket));
  socket.on('diconnecting', () => leaveRoom(socket));
});


server.listen(port, ()=> {
  console.log('Server stated: ' + port);
});
