import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookroutes';
import borrowRoutes from './routes/borrowroutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

export default app;
