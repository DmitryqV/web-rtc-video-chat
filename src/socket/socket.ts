import { io } from 'socket.io-client';

export const socket = io(process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001/', {
  forceNew: true,
  timeout: 1000,
  transports: ['websocket'],
});
