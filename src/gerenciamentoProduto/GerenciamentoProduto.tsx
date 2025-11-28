import { useState } from 'react';
import axios from 'axios';
import './GerenciamentoProduto.css';

const API_URL = 'http://localhost:3001/api/products'; 

const GerenciamentoProduto = () => {

    const [nome, setNome] = useState('');
    const [precoAtual, setPrecoAtual] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState(''); 
    const [dataValidade, setDataValidade] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        const token = localStorage.getItem('jwtToken'); 

        if (!token) {
            alert("Sessão expirada. Faça login novamente.");
            return;
        }

        try {
            const productData = {
                name: nome,
                currentPrice: parseFloat(precoAtual),
                type: tipo,
                description: descricao,
                expirationDate: dataValidade,
                quantity: parseInt(quantidade),
            };

            const response = await axios.post(
                API_URL, 
                productData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            alert(`Produto ${response.data.product.name} cadastrado com sucesso!`);

            setNome('');
            setPrecoAtual('');
            setTipo('');
            setDescricao('');
            setDataValidade('');
            setQuantidade('');

        } catch (error: any) {
            console.error('Erro no cadastro:', error);
            const msg = error.response?.data?.message || 'Falha ao conectar com a API ou token inválido.';
            alert(`Erro ao cadastrar: ${msg}`);
        }
    };

    return (
        <div className="produtos">
            <h2>Gerenciamento de Produtos</h2>

            <form onSubmit={handleSubmit} className="form-produto"> 
                <input type="text" placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} required />
                <input type="number" placeholder="Preço Atual (R$)" value={precoAtual} onChange={e => setPrecoAtual(e.target.value)} required />
                <input type="text" placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} required />
                <input type="text" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required /> 
                <input type="date" placeholder="Data de Validade" value={dataValidade} onChange={e => setDataValidade(e.target.value)} required />
                
                {}
                <input type="number" placeholder="Quantidade em Estoque" value={quantidade} onChange={e => setQuantidade(e.target.value)} required /> 
                
                <button type="submit">Salvar</button> 
            </form>

            <h3>Estoque</h3>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Validade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Azeite de Oliva Extra Virgem 250ml</td>
                        <td>R$ 16,90</td>
                        <td>Alimento</td>
                        <td>18</td>
                        <td>10/04/2027</td>
                        <td>
                            <button className="editar">Editar</button>
                            <button className="remover">Remover</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Farofa Pronta Zaeli Tradicional</td>
                        <td>R$ 6,99</td>
                        <td>Alimento</td>
                        <td>10</td>
                        <td>12/12/2027</td>
                        <td>
                            <button className="editar">Editar</button>
                            <button className="remover">Remover</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Biscoito Rosquinha</td>
                        <td>R$ 3,59</td>
                        <td>Alimento</td>
                        <td>33</td>
                        <td>07/02/2026</td>
                        <td>
                            <button className="editar">Editar</button>
                            <button className="remover">Remover</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Suco de Uva Tinto Aliança</td>
                        <td>R$ 16,90</td>
                        <td>Bebida</td>
                        <td>2</td>
                        <td>11/01/2026</td>
                        <td>
                            <button className="editar">Editar</button>
                            <button className="remover">Remover</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Coca-Cola 2l</td>
                        <td>R$ 11,90</td>
                        <td>Bebida</td>
                        <td>51</td>
                        <td>15/05/2027</td>
                        <td>
                            <button className="editar">Editar</button>
                            <button className="remover">Remover</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default GerenciamentoProduto;