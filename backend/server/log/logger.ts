import log4js, { Logger } from "log4js";

const logger: Logger = log4js.getLogger();
logger.level = 'info';


log4js.configure(
  (process.env.NODE_ENV === 'production') ? (
    {
      appenders: {
        'console': { type: 'console' },
        'file': { type: 'file', filename: 'server.log' }
      },
      categories: {
        default: { appenders: ['file', 'console'], level: 'INFO' },
      }
    }
  ) : (
    {
      appenders: { 'console': { type: 'console' } },
      categories: {
        default: { appenders: ['file'], level: 'INFO' },
      }
    }
  )
);



export { logger };
