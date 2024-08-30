import express from 'express';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import linksRouter from './routers/links';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/links', linksRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/short-link');

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run().catch(console.error);
