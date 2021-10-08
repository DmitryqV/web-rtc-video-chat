const express = require('express');
const path = require('path');
const logger = require('./server/log/logger');
const app = express();
const server = require('http').createServer(app);
const port: any = process.env.PORT || 3001;

try {
  require('./server/services/socket-service')(
    require('socket.io')(server)
  );
  logger.info('socket services loaded');
} catch (e) {
  logger.error('socket services not loaded!', e);
  console.log(e);
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', ({ }, req: any) => {
    try {
      req.sendStatus(200).sendFile(path.resolve(__dirname, 'build', 'index.html'));
      logger.info('build succeeded');
    } catch {
      logger.error('building error, folder "build" not found in root dirictory.');
      req.sendStatus(404);
    }
  });
}

server.listen(port, () => logger.info('server stated, port: ' + port));
