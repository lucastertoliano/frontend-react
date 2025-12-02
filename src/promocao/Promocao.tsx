import React, { useState, useEffect } from "react";
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products';

const Promocao = () => {
  const [produtos, setProdutos] = useState([]);
  const [descontosTemporarios, setDescontosTemporarios] = useState<{ [key: string]: string }>({});

  const fetchProducts = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return;

    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const produtosComDescontoTemp = response.data.map((p: any) => ({
        ...p,
        desconto: '',
      }));

      setProdutos(produtosComDescontoTemp);
    } catch (error) {
      console.error('Erro ao buscar produtos para promoções:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDescontoChange = (id: string, valor: string) => {
    setDescontosTemporarios({
      ...descontosTemporarios,
      [id]: valor,
    });
  };

  const calcularNovoPreco = (precoAtual: number, descontoPercentual: number) => {
    if (!precoAtual || !descontoPercentual) return null;

    const descontoDecimal = descontoPercentual / 100;
    return precoAtual * (1 - descontoDecimal);
  };

  const aplicarDesconto = async (produto: any) => {
    const token = localStorage.getItem('jwtToken');
    const valorDesconto = descontosTemporarios[produto._id];
    const percentual = parseFloat(valorDesconto) || 0;

    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      return;
    }

    if (percentual <= 0 || percentual > 100) {
      alert("Informe um valor de desconto entre 1 e 100.");
      return;
    }

    try {
      const novoPreco = calcularNovoPreco(produto.currentPrice, percentual);

      if (novoPreco === null || novoPreco >= produto.currentPrice) {
        alert("O novo preço de promoção deve ser menor que o preço atual.");
        return;
      }

      const url = `${API_URL}/promotion/apply/${produto._id}`;
      await axios.put(url,
        { promotionPrice: novoPreco },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      alert(`Promoção de ${percentual}% aplicada com sucesso!`);
      fetchProducts();
      setDescontosTemporarios({});

    } catch (error: any) {
      console.error('Erro ao aplicar desconto:', error);
      const msg = error.response?.data?.message || 'Falha ao aplicar a promoção.';
      alert(`Erro: ${msg}`);
    }
  };

  const removerPromocao = async (id: string) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      return;
    }

    if (!window.confirm("Tem certeza que deseja remover esta promoção?")) {
      return;
    }

    try {
      const url = `${API_URL}/promotion/remove/${id}`;
      await axios.put(url, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      alert("Promoção removida com sucesso!");
      fetchProducts();
    } catch (error: any) {
      console.error('Erro ao remover promoção:', error);
      const msg = error.response?.data?.message || 'Falha ao remover a promoção.';
      alert(`Erro: ${msg}`);
    }
  };


  return (
    <div className="produtos">
      <h2>Gerenciamento de Promoções</h2>
      <h3>Estoque</h3>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço Atual</th>
            <th>Preço em Promoção</th>
            <th>Desconto (%)</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto: any) => {
            const descontoDigitado = parseFloat(descontosTemporarios[produto._id]) || 0;
            const novoPrecoCalculado = calcularNovoPreco(produto.currentPrice, descontoDigitado);

            return (
              <tr key={produto._id}>
                <td>{produto.name}</td>
                <td>R${produto.currentPrice.toFixed(2)}</td>

                <td>
                  {produto.promotionPrice
                    ? `R$${produto.promotionPrice.toFixed(2)}`
                    : (novoPrecoCalculado ? `R$${novoPrecoCalculado.toFixed(2)}` : "--")}
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={descontosTemporarios[produto._id] || ''}
                    onChange={(e) => handleDescontoChange(produto._id, e.target.value)}
                    placeholder="%"
                    style={{ width: "60px", textAlign: "center" }}
                  />
                </td>

                <td>
                  <button
                    className="editar"
                    onClick={() => aplicarDesconto(produto)}
                    disabled={descontoDigitado <= 0 || descontoDigitado > 100}
                  >
                    Salvar Promoção
                  </button>

                  <button
                    className="remover"
                    onClick={() => removerPromocao(produto._id)}
                  >
                    Remover Promoção
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Promocao;