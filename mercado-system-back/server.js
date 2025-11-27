import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import usersRoutes from './routes/usersRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import promotionsRoutes from './routes/promotionsRoutes.js';
import equipmentRoutes from "./routes/EquipmentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// middlewares globais
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//rotas api
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/promotions', promotionsRoutes);
app.use('/api/equipment', equipmentRoutes);

// rota
app.get('/', (req, res) => {
  res.json({ message: 'API do Sistema Administrativo do Supermercado - Backend' });
});

// tratamento de erro
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(err.status || 500).json({ 
      message: err.message || 'Erro interno do servidor'
  });
});

// inicia servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV || 'development'}`);
});