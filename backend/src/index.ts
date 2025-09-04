import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { setupDatabase } from './config/database.js';
import authRoutes from './domains/auth/routes.js';
import petRoutes from './domains/pets/routes.js';
import adoptionRoutes from './domains/adoptions/routes.js';

dotenv.config();
setupDatabase();

const app = express();
const port = process.env.PORT || 5001;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Pet Adoption API is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
