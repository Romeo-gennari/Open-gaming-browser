const { createServer } = require('http');
const express = require('express');

const app = express();
const server = createServer(app);

// Application listener
const port = process.env.PORT ?? 5050;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

exports.app = app;
exports.server = server;
exports.port = port;
