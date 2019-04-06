import morgan from 'morgan';
import tracer from 'tracer';

export const log = (() => {
  const logger = tracer.colorConsole();
  logger.requestLogger = morgan('dev');
  return logger;
})();
