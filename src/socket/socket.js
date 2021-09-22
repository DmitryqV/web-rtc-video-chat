import {io} from 'socket.io-client';

export const socket = io('http://192.168.43.8:3001', {
  "forceNew": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ['websocket']
});