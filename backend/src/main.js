import 'dotenv/config';
import './passport.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import knexSession from 'connect-session-knex';
import session from 'express-session';
import passport from 'passport';
import { ZodError } from 'zod';
import knex from './database.js';
import index from './routes.js';

const app = express();

const KnexSessionStore = knexSession(session);

// Configure some middlewares
app.use(cors());   // Allow all origins
app.use(helmet()); // Secure the app against common web vulnerabilities
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 15 * 24 * 3600 * 1000, // 15 days
  },
  store: new KnexSessionStore({ knex, tableName: 'websessions' }),
}));
app.use(passport.initialize());
app.use(passport.session());

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

// Error handler
app.use((err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Invalid body', errors: err.errors });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Application listener
const port = process.env.PORT ?? 5050;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
