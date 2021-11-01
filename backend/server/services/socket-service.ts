import { Socket } from "socket.io";
import { Server } from 'http';
import { IRelayIce, IRelaySdp } from './socket-service.interfaces';
import { logger } from "../log/logger";
import { actions } from '../../../src/socket/socket-events';

export const socketService = (server: Server) => {
  const io = require('socket.io')(server);
  const { version, validate } = require('uuid');

  const getRooms = (): string[] => {
    logger.info('getting current rooms sessions');
    return Array.from<string>(io.sockets.adapter.rooms.keys()).filter((roomID: string): boolean => validate(roomID) && version(roomID) === 4);
  };

  const shareRooms = () => {
    io.emit(actions.share, { rooms: getRooms() });
    logger.info('sending open rooms sessions');
  };

  const leaveRoom = (socket: Socket) => {
    const { rooms } = socket;

    rooms.forEach((roomID: string) => {
      Array.from<string>(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID: string) => {
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

  io.on('connection', (socket: Socket) => {
    logger.info(`the user: ${socket.id} has connected`);
    shareRooms();

    socket.on(actions.join, (config: { room: string }) => {
      const { rooms: joinedRooms } = socket;
      const { room: roomID } = config;

      if (!Array.from<string>(joinedRooms).includes(roomID)) {
        Array.from<string>(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID: string) => {
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
      shareRooms();
    });

    socket.on(actions.leave, () => leaveRoom(socket));

    socket.on('disconnect', () => {
      leaveRoom(socket);
      logger.info(`the user: ${socket.id} has disconnecting`);
    });

    socket.on(actions.relaySdp, ({ peerID, sessionDescription }: IRelaySdp) => {
      io.to(peerID).emit(actions.sessionDescription, {
        peerID: socket.id,
        sessionDescription
      });
    });

    socket.on(actions.relayIce, ({ peerID, iceCandidate }: IRelayIce) => {
      io.to(peerID).emit(actions.iceCandidate, {
        peerID: socket.id,
        iceCandidate
      });
    });

  });
};
