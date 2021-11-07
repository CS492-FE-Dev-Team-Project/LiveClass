import winston from 'winston';
import config from '../config';

const transports = [];

winston.addColors({ http: 'magenta' });

transports.push(new winston.transports.Console());

const Logger = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.cli(),
    winston.format.splat()
  ),
  transports
});

export default Logger;
