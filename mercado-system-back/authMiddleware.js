import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao_muito_forte';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });
    req.user = payload;
    next();
  });
}
