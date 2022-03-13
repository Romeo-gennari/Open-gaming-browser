import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import index from './routes';

const app = express();

// Configure some middlewares
app.use(cors());   // Allow all origins
app.use(helmet()); // Secure the app against common web vulnerabilities
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logger
app.use((req, _res, next) => {
  console.log(`New request: ${req.method} ${req.url}`);
  next();
});

// Listen routes
app.use('/', index);

// 404 Handler (if we arrive up to this middleware, it means that the route was not found,
// because middlewares are executed in order).
app.use((_req, res) => {
  res.send('Not Found', 404);
});

// Application listener
const port = process.env.PORT ?? 5050;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
