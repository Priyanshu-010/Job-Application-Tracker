import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"

import connectDb from './config/db.js';
import userRouter from './routes/user.route.js'
import jobRouter from './routes/job.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRouter);
app.use('/api/job', jobRouter);

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
  connectDb();
})