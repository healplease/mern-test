import express from 'express';
import cors from 'cors';

import { connect } from './db.js';
import { errorHandler } from './error.js';

import authRouter from './auth/routes.js';
import todoRouter from './todo/routes.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
}));

app.use('/api/auth', authRouter);
app.use('/api/todos', todoRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is running on port ${process.env.PORT}`);
});
