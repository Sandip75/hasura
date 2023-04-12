const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const config = require('config');

const logDir = 'logs';

if (config.env !== 'dev' && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = () => new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '16m',
  maxFiles: '14d'
});

const winston = createLogger({
  level: config.env === 'dev' ? 'debug' : 'warn',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    ...(config.env !== 'dev' ? [dailyRotateFileTransport()] : [])
  ]
});

module.exports = winston;