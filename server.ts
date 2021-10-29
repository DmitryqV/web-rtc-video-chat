// @ts-ignore
const express = require('express');
const path = require('path');
const logger = require('./server/log/logger');
const app = express();
const server = require('http').createServer(app);
const port: string | number = process.env.PORT || 3001;

try {
  require('./server/services/socket-service')(server);
  logger.info('socket services loaded');
} catch (e) {
  logger.error('socket services not loaded!', e);
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (_: undefined, req: any) => {
    try {
      req.sendStatus(200).sendFile(path.resolve(__dirname, 'build', 'index.html'));
      logger.info('build succeeded');
    } catch (e) {
      req.statusCode(404);
      logger.error('building error, folder "build" not found in root dirictory.', e);
    }
  });
}

server.listen(port, () => {
  console.log(process.env.NODE_ENV);
  logger.info('server stated, port: ' + port)
});
