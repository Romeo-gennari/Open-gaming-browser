import { createServer } from 'node:http';
import express from 'express';

export const app = express();
export const server = createServer(app);

// Application listener
export const port = process.env.PORT ?? 5050;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
