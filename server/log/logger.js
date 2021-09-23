const log4js = require("log4js");
logger = log4js.getLogger();
logger.level = 'info';

log4js.configure({
    appenders: { cheese: { type: "file", filename: "server.log" } },
    categories: { default: { appenders: ["cheese"], level: "info" } }
});
module.exports = logger;