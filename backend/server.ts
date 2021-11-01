import express, { Request, Response, Application } from 'express';
import path from 'path';
import { logger } from './server/log/logger';
import http, { Server } from 'http';
import { socketService } from './server/services/socket-service';
const app: Application = express();
const server: Server = http.createServer(app);
const port: string | number = process.env.PORT || 3001;

try {
  socketService(server);
  logger.info('socket services loaded');
} catch (e) {
  logger.error('socket services not loaded!', e);
}
process.env.NODE_ENV = 'production'
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (_: Request, res: Response) => {
    try {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
      logger.info('build succeeded');
    } catch (e) {
      res.sendStatus(404);
      logger.error('building error, folder "build" not found in root dirictory.', e);
    }
  });
}

server.listen(port, () => {
  logger.info('server stated, port: ' + port)
});
