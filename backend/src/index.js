import express from 'express';
import dotenv from 'dotenv';

import connectDb from './config/db.js';
import userRouter from './routes/user.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRouter);

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
  connectDb();
})