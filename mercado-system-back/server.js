import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/mercado-system')
.then(() => console.log('✅ MongoDB Conectado com Sucesso!'))
    .catch(err => {
    console.error('❌ ERRO NA CONEXÃO COM O MONGODB:', err.message);
    });

dotenv.config();

import usersRouter from './router/user-router.js';
import productsRouter from './router/productsRouter.js';
import promotionsRouter from './router/promotionsRouter.js';
import EquipmentRouter from "./router/EquipmentRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// middlewares globais
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user',usersRouter)

//rotas api
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/promotions', promotionsRouter);
app.use('/api/equipment', EquipmentRouter);

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