import { Logger } from "log4js";

const log4js = require("log4js");
const logger: Logger = log4js.getLogger();
logger.level = 'info';

log4js.configure({
  appenders: {
    'console': {
      type: 'console'
    },
    'file': {
      type: 'file',
      filename: 'server.log'
    }
  },
  categories: {
    default: {
      appenders: ['file', 'console'],
      level: 'INFO'
    },
  }
});

export { logger };