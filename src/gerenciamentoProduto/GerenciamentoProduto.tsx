import { useState, useEffect } from 'react';
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

    const [produtos, setProdutos] = useState([]);
    const [produtoEmEdicao, setProdutoEmEdicao] = useState<any>(null);

    const fetchProducts = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return;

        try {
            const response = await axios.get(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (produto: any) => {
        setProdutoEmEdicao(produto);

        setNome(produto.name);
        setPrecoAtual(produto.currentPrice.toString());
        setTipo(produto.type);
        setDescricao(produto.description);
        setQuantidade(produto.quantity.toString());

        const dataIso = new Date(produto.expirationDate).toISOString().split('T')[0];
        setDataValidade(dataIso);
    };

    const handleCancelEdit = () => {
        setProdutoEmEdicao(null);
        setNome(''); setPrecoAtual(''); setTipo(''); setDescricao('');
        setDataValidade(''); setQuantidade('');
    };

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Tem certeza que deseja remover o produto "${name}"?`)) {
            return;
        }

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert("Sessão expirada. Faça login novamente.");
            return;
        }

        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert(`Produto ${name} removido com sucesso!`);
            fetchProducts();
        } catch (error: any) {
            console.error('Erro ao remover:', error);
            const msg = error.response?.data?.message || 'Falha ao remover o produto.';
            alert(`Erro: ${msg}`);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');

        if (!token) {
            alert("Sessão expirada. Faça login novamente.");
            return;
        }

        const precoNumerico = parseFloat(precoAtual);
        const quantidadeNumerica = parseInt(quantidade);

        if (isNaN(precoNumerico) || isNaN(quantidadeNumerica)) {
            alert("Por favor, insira valores válidos para Preço e Quantidade.");
            return;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(dataValidade)) {
            alert("Por favor, selecione a Data de Validade usando o seletor (YYYY-MM-DD).");
            return;
        }

        try {
            const productData = {
                name: nome,
                currentPrice: precoNumerico,
                type: tipo,
                description: descricao,
                expirationDate: dataValidade,
                quantity: quantidadeNumerica,
            };

            let response;

            if (produtoEmEdicao) {
                const url = `${API_URL}/${produtoEmEdicao._id}`;
                response = await axios.put(url, productData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert(`Produto ${response.data.product.name} atualizado com sucesso!`);
            } else {
                response = await axios.post(API_URL, productData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert(`Produto ${response.data.product.name} cadastrado com sucesso!`);
            }

            fetchProducts();
            handleCancelEdit();

        } catch (error: any) {
            console.error('Erro na submissão:', error);
            const msg = error.response?.data?.message || 'Falha na requisição.';
            alert(`Erro: ${msg}`);
        }
    };

    return (
        <div className="produtos">
            <h2>Gerenciamento de Produtos</h2>

            <form onSubmit={handleSubmit} className="form-produto">
                {produtoEmEdicao && (
                    <button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#e74c3c', color: 'white' }}>
                        Cancelar Edição
                    </button>
                )}

                <input type="text" placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} required />
                <input type="number" placeholder="Preço Atual (R$)" value={precoAtual} onChange={e => setPrecoAtual(e.target.value)} required />
                <input type="text" placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} required />
                <input type="text" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                <input type="date" placeholder="Data de Validade" value={dataValidade} onChange={e => setDataValidade(e.target.value)} required />
                <input type="number" placeholder="Quantidade em Estoque" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />

                <button type="submit">
                    {produtoEmEdicao ? 'Atualizar' : 'Salvar'}
                </button>
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
                    {produtos.map((produto: any) => (
                        <tr key={produto._id}>
                            <td>{produto.name}</td>
                            <td>
                                R$ {produto.promotionPrice
                                    ? produto.promotionPrice.toFixed(2).replace('.', ',')
                                    : produto.currentPrice.toFixed(2).replace('.', ',')}
                                {}
                                {produto.promotionPrice && <span style={{ fontSize: '0.8em', color: 'red' }}> (PROMO)</span>}
                            </td>
                            <td>{produto.type}</td>
                            <td>{produto.quantity}</td>
                            <td>{new Date(produto.expirationDate).toLocaleDateString('pt-BR')}</td>
                            <td>
                                <button
                                    className="editar"
                                    onClick={() => handleEdit(produto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="remover"
                                    onClick={() => handleDelete(produto._id, produto.name)}
                                >
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GerenciamentoProduto;