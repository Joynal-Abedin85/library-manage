import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookroutes';
import borrowRoutes from './routes/borrowroutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Library Management Server is running! \n for all books https://redux-backend-lac.vercel.app/api/books \n for borrow details https://redux-backend-lac.vercel.app/api/borrows ');
});

app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

export default app;
