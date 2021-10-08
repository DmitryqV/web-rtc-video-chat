import { io } from 'socket.io-client';

export const socket = io('http://localhost:3001/', {
  forceNew: true,
  timeout: 1000,
  transports: ['websocket'],
});
