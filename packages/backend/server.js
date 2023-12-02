import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import './environment.js';

import { initializeSockets } from './src/sockets/index.js';
import { initializeSequelize } from './src/db/models/index.js';

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.use((socket, next) => {
  console.log('jwt token', socket.handshake.auth.token);
  // auth0 logic to verify the jwt
  next();
});

const PORT = process.env.PORT || 8080;

const initializeApp = async () => {
  // Intialize Sequelize
  await initializeSequelize();

  // Initialize sockets
  initializeSockets(io);

  http.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 App listening on the port ${PORT}`);
  });
};

initializeApp();
