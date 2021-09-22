import socketIOClient from 'socket.io-client';


const socket = socketIOClient('10.1.0.248:3001/', {
  forceNew: true,
  reconnectionAttempts: "Infinity",
  timeout : 1000, 
  transports : ["websocket"],
});

socket.on("connect", () => {  console.log(socket.id);});

export default socket;
