const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false,
});

// Verifica a conexão
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao PostgreSQL:', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Erro ao executar consulta de teste:', err.stack);
        }
        console.log('✅ Conectado ao PostgreSQL com sucesso! Tempo:', result.rows[0].now);
    });
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};