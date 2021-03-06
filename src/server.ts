/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import './database/connection';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();
app.use(express.json({ limit: '200kb' }));
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333);
