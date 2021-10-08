module.exports = (io: any) => {
  const actions = require('../../src/socket/socket-events');
  const logger = require("../log/logger");
  const { version, validate } = require('uuid');

  const getRooms = () => {
    logger.info('getting current rooms sessions');
    return Array.from(io.sockets.adapter.rooms.keys()).filter((roomID) => validate(roomID) && version(roomID) === 4);
  };

  const shareRooms = () => {
    io.emit(actions.share, { rooms: getRooms() });
    logger.info('sending open rooms sessions');
  };

  const leaveRoom = (socket: any) => {
    const { rooms } = socket;

    rooms.forEach((roomID: string) => {
      Array.from(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID) => {
        io.to(clientID).emit(actions.removePeer, {
          peerID: socket.id
        });
        socket.emit(actions.removePeer, {
          peerID: clientID
        });
      });
      logger.info(`the user: ${socket.id} has left the room: ${roomID}`);
      socket.leave(roomID);
    });
    shareRooms();
  };

  io.on('connection', (socket: any) => {
    logger.info(`the user: ${socket.id} has connected`);
    shareRooms();

    socket.on(actions.join, (config: any) => {
      const { rooms: joinedRooms } = socket;
      const { room: roomID } = config;

      if (!Array.from(joinedRooms).includes(roomID)) {
        Array.from(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID) => {
          io.to(clientID).emit(actions.addPeer, {
            peerID: socket.id,
            createOffer: false
          });
          socket.emit(actions.addPeer, {
            peerID: clientID,
            createOffer: true
          });
        });
        socket.join(roomID);
        logger.info(`the user: ${socket.id} has join the room: ${roomID}`);
        getRooms();
      };
    });

    socket.on(actions.leave, () => leaveRoom(socket));
    socket.on('disconnect', () => {
      leaveRoom(socket);
      logger.info(`the user: ${socket.id} has disconnecting`);
    });
  });
};
