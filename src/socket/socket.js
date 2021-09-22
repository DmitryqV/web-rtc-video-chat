import { io } from 'socket.io-client';


const socket = io('192.168.50.228:3001/', {
  "forceNew": true,
  reconnectionAttempts: "Infinity",
  timeout : 1000, 
  transports : ["websocket"],
});

socket.on("connect", () => {  console.log(socket.id);});

export default socket;
