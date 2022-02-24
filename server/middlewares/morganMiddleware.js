const morgan = require('morgan');
const logger = require('./logger');

const env = process.env.NODE_ENV || 'development'
const isDevelopment = env === 'development'

const loggerStream = {
    write: (message) =>
        logger.http(message.substring(0, message.lastIndexOf('\n'))),
}

const morganMiddleware = morgan(
    ':remote-addr - :remote-user :method :url :status :res[content-length] - :response-time ms\n',
    { stream: loggerStream, skip: () => !isDevelopment },
)

module.exports = morganMiddleware;