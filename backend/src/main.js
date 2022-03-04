import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// Application use
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`New request: ${req.method} ${req.url}`);
  next();
});

// Listen routes
app.get('/', (req, res) => res.json({ message: 'Hello' }));

// Application listener
const port = process.env.PORT ?? 5050;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
