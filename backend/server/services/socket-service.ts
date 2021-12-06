import { Socket } from "socket.io";
import { Server } from 'http';
import { IRelayIce, IRelaySdp } from './socket-service.interfaces';
import { logger } from "../log/logger";
import { actions } from '../../../src/socket/socket-events';

export const socketService = (server: Server) => {
  const io = require('socket.io')(server);
  const { version, validate } = require('uuid');

  const getRooms = (): string[] => {
    return Array.from<string>(io.sockets.adapter.rooms.keys()).filter((roomID: string): boolean => {
      return validate(roomID) && version(roomID) === 4;
    });
  };

  const shareRooms = () => {
    io.emit(actions.share, { rooms: getRooms() });
    logger.info('sending open rooms sessions');
  };

  const leaveRoom = (socket: Socket) => {
    const { rooms } = socket;

    rooms.forEach((roomID: string) => {
      Array.from<string>(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID: string) => {
        io.to(clientID).emit(actions.removePeer, { peerID: socket.id });
        socket.emit(actions.removePeer, { peerID: clientID });
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
      const { room: roomID } = config;

      Array.from<string>(io.sockets.adapter.rooms.get(roomID) || []).forEach((clientID: string) => {
        io.to(clientID).emit(actions.addPeer, {
          peerID: socket.id, createOffer: false
        });
        socket.emit(actions.addPeer, {
          peerID: clientID, createOffer: true
        });
      });

      socket.join(roomID);
      logger.info(`the user: ${socket.id} has join the room: ${roomID}`);
    });

    socket.on(actions.leave, () => leaveRoom(socket));

    socket.on('disconnect', () => leaveRoom(socket));

    socket.on(actions.relaySdp, ({ peerID, sessionDescription }: IRelaySdp) => {
      io.to(peerID).emit(actions.sessionDescription, {
        peerID: socket.id, sessionDescription
      });
    });

    socket.on(actions.relayIce, ({ peerID, iceCandidate }: IRelayIce) => {
      io.to(peerID).emit(actions.iceCandidate, {
        peerID: socket.id, iceCandidate
      });
    });

    socket.on(actions.sendMessage, ({ message, author, roomId }: any) => {
      Array.from<string>(io.sockets.adapter.rooms.get(roomId.roomId) || []).forEach((clientID: string) => {
        io.to(clientID).emit(actions.newMessage, {
          message, author
        });
      });
    });
  });
};
