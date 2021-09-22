const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3001;

require('./server/services/socket-service')(
  require('socket.io')(server)
);

// app.use(express.static('build'));

// app.get('*', (res,req) => {
//   req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

server.listen(port, () => console.log('Server stated: ' + port));
