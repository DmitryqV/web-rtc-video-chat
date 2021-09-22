const actions = require('../../src/socket/socket-events');

module.exports = (io) => {

  const usersRooms = () => {
    return Array.from(io.sockets.adapter.rooms.keys());
  };

  const shareRooms = () => {
    io.emit(actions.share, { rooms: usersRooms() });
  };

  const leaveRoom = (socket) => {
    const { rooms } = socket;
    rooms.forEach((roomID) => {
      Array.from(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID) => {

        io.to(clientID).emit(actions.removePeer, { peerID: socket.id });

        socket.emit(actions.removePeer, { peerID: clientID });
      });
      socket.leave(roomID);
    });
    shareRooms();
  };

  io.on('connection', (socket) => {
    shareRooms();

    console.log("user connected, socket id: " + socket.id);

    socket.on(actions.join, (config) => {
      const { room: roomID } = config;
      const { rooms: joinedRooms } = socket;

      if (!Array.from(joinedRooms).includes(roomID)) {
        Array.from(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID) => {

          io.to(clientID).emit(actions.addPeer, { peerID: socket.id, createOffer: false });

          socket.emit(actions.addPeer, { peerID: clientID, createOffer: true });
        });
        socket.join(roomID);
        usersRooms();
      };
    });

    socket.on(actions.leave, () => leaveRoom(socket));
    socket.on('disconnect', () => leaveRoom(socket));
  });
};
