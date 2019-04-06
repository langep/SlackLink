import express from 'express';
import http from 'http';
import bootstrap from './server/bootstrap';
import { log } from './utils';

const port = process.env.PORT || 5000;

const app = express();

app.start = async () => {
  log.info('Starting server...');
  app.set('port', port);
  bootstrap(app);

  const server = http.createServer(app);
  server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;
    log.error(`Failed to start server: ${error}`);
    process.exit(1);
  });

  server.on('listening', () => {
    const address = server.address();
    log.info(`Server listening ${address.address}:${address.port}`);
  });

  server.listen(port, '0.0.0.0');
};

app.start().catch((err) => {
  log.error(err);
});

export default app;
