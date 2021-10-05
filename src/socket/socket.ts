import { io } from 'socket.io-client';

export const socket = io('/', {
  forceNew: true,
  timeout: 1000,
  transports: ['websocket'],
});
