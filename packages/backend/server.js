import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import "./environment.js";

import { initializeSockets } from "./src/sockets/index.js";
import { initializeSequelize } from "./src/db/models/index.js";

// todo: can be refractored :)

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8080;

const initializeApp = async () => {
  // Intialize Sequelize
  await initializeSequelize();

  // Initialize sockets
  initializeSockets(io);

  http.listen(PORT, () => {
    console.log(`🚀 App listening on the port ${PORT}`);
  });
};

initializeApp();
