const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use(express.json())

const users = [
    {
        id: 1, 
        name: "João",
        email: 'j@email.com'
    },
    {
        id: 2, 
        name: "Pedro",
        email: 'p@email.com'
    },
    {
        id: 3, 
        name: "Ana",
        email: 'a@email.com'
    }

]

app.get('/api/users', (req, res) => {
    try {
        res.status(200).json({data: users})
    } catch (error) {
        res.status(500).json({data: `Não foi possível recuperar o usuário ${req.body.name}`})
    }
})

app.get('/api/products', (req, res) => {

})

app.post('/api/users', (req, res) => {
    users.push(req.body);
})

app.post('/api/products', (req, res) => {

})

app.listen(process.env.PORT, () => {
    console.log(`O servidor está rodando na porta ${process.env.PORT}`);
})