const express = require("express");
const dotenv = require('dotenv');
const db = require('./db.js'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const cors = require('cors'); 

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); 

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao_muito_segura';

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    
    if (token == null) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        req.user = user; 
        next();
    });
};

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT funcionario_id, senha_hash, nivel_acesso FROM FUNCIONARIO WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }
        
        const funcionario = result.rows[0];

        const isMatch = await bcrypt.compare(password, funcionario.senha_hash); 
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }
        
        const token = jwt.sign(
            { id: funcionario.funcionario_id, nivel: funcionario.nivel_acesso }, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );
        
        res.status(200).json({ token, funcionario_id: funcionario.funcionario_id, nivel: funcionario.nivel_acesso });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.post('/api/users', async (req, res) => {
    const { nome, email, senha, cpf, cargo, nivel_acesso, url_foto_perfil } = req.body;
    
    if (!nome || !email || !senha || !cpf || !cargo) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
    }
    
    try {
        //*CRIPTOGRAFIA*//
        const senhaHash = await bcrypt.hash(senha, 10); 

        const sql = `
            INSERT INTO FUNCIONARIO (nome, email, senha_hash, cpf, cargo, nivel_acesso, url_foto_perfil) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING funcionario_id, nome, email`;
        
        const values = [nome, email, senhaHash, cpf, cargo, nivel_acesso || 'Comum', url_foto_perfil];
        const result = await db.query(sql, values);
        
        res.status(201).json({ 
            message: 'Funcionário cadastrado com sucesso!', 
            user: result.rows[0] 
        });

    } catch (error) {

        if (error.code === '23505') {
            return res.status(409).json({ message: 'Email ou CPF já cadastrados.' });
        }
        console.error('Erro ao cadastrar funcionário:', error);
        res.status(500).json({ message: 'Erro interno ao cadastrar funcionário.' });
    }
});

//*LISTA DE TODOS OS ÚSUARIOS*//
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const result = await db.query('SELECT funcionario_id, nome, email, cpf, cargo, nivel_acesso, url_foto_perfil FROM FUNCIONARIO ORDER BY funcionario_id DESC');
        res.status(200).json({ data: result.rows });
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        res.status(500).json({ message: 'Não foi possível recuperar a lista de usuários.' });
    }
});

//*VISUALIZAR DETALHES*//
app.get('/api/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT funcionario_id, nome, email, cpf, cargo, nivel_acesso, url_foto_perfil FROM FUNCIONARIO WHERE funcionario_id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Funcionário não encontrado.' });
        }
        res.status(200).json({ data: result.rows[0] });
    } catch (error) {
        console.error('Erro ao buscar funcionário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


//* DELETE *//
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM FUNCIONARIO WHERE funcionario_id = $1 RETURNING funcionario_id', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Funcionário não encontrado.' });
        }
        res.status(200).json({ message: 'Funcionário removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover funcionário:', error);
        res.status(500).json({ message: 'Erro interno ao remover funcionário.' });
    }
});

//* AUTENTICAÇÃO *//

app.put('/api/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, nivel_acesso, url_foto_perfil } = req.body;

    try {
        const sql = `
            UPDATE FUNCIONARIO 
            SET nome = $1, cargo = $2, nivel_acesso = $3, url_foto_perfil = $4
            WHERE funcionario_id = $5
            RETURNING funcionario_id`;
        const values = [nome, cargo, nivel_acesso, url_foto_perfil, id];
        
        const result = await db.query(sql, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Funcionário não encontrado.' });
        }

        res.status(200).json({ message: 'Funcionário atualizado com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
        res.status(500).json({ message: 'Erro interno ao atualizar funcionário.' });
    }
});

app.get('/api/products', authenticateToken, (req, res) => {

    res.status(501).json({ message: 'A rota GET /api/products ainda não foi implementada.' });
});

app.post('/api/products', authenticateToken, (req, res) => {

    res.status(501).json({ message: 'A rota POST /api/products ainda não foi implementada.' });
});

//*SERVIDOR*//
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 O servidor está rodando na porta ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});