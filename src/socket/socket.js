import { io } from 'socket.io-client';


const socket = io('/', {
  forceNew: true,
  reconnectionAttempts: 'Infinity',
  timeout: 1000,
  transports: ['websocket'],
});

socket.on('connect', () => console.log(socket.id));

export default socket;
