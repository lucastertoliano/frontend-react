import React, { useState } from "react";

const Promocao = () => {
  const [produtos, setProdutos] = useState([
    { nome: "Azeite de Oliva Extra Virgem 250ml", preco: 16.9, desconto: 0 },
    { nome: "Farofa Pronta Zaeli Tradicional", preco: 6.99, desconto: 0 },
    { nome: "Biscoito Rosquinha", preco: 3.59, desconto: 0 },
    { nome: "Suco de Uva Tinto Aliança", preco: 16.9, desconto: 0 },
    { nome: "Coca-Cola 2l", preco: 11.9, desconto: 0 },
  ]);

  const handleDescontoChange = (index, valor) => {
    const novoDesconto = parseFloat(valor) || 0;
    const novosProdutos = [...produtos];
    novosProdutos[index].desconto = novoDesconto;
    setProdutos(novosProdutos);
  };

  const calcularNovoPreco = (preco, desconto) => {
    return preco - preco * (desconto / 100);
  };

  const aplicarDesconto = (index) => {
    const novosProdutos = [...produtos];
    const produto = novosProdutos[index];
    if (produto.desconto > 0) {
      const novoPreco = calcularNovoPreco(produto.preco, produto.desconto);
      produto.preco = parseFloat(novoPreco.toFixed(2));
      produto.desconto = 0;
      setProdutos(novosProdutos);
      alert("Novo preço salvo com sucesso!");
    } else {
      alert("Informe um valor de desconto antes de salvar.");
    }
  };

  const removerProduto = (index) => {
    const novosProdutos = produtos.filter((_, i) => i !== index);
    setProdutos(novosProdutos);
  };

  return (
    <div className="produtos">
      <h2>Gerenciamento de Promoções</h2>
      <h3>Estoque</h3>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Desconto (%)</th>
            <th>Novo preço</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.nome}</td>
              <td>R${produto.preco.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={produto.desconto}
                  onChange={(e) =>
                    handleDescontoChange(index, e.target.value)
                  }
                  placeholder="%"
                  style={{ width: "60px", textAlign: "center" }}
                />
              </td>
              <td>
                {produto.desconto > 0
                  ? `R$${calcularNovoPreco(
                      produto.preco,
                      produto.desconto
                    ).toFixed(2)}`
                  : "--"}
              </td>
              <td>
                <button
                  className="editar"
                  onClick={() => aplicarDesconto(index)}
                >
                  Salvar
                </button>
                <button
                  className="remover"
                  onClick={() => removerProduto(index)}
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
};

export default Promocao;
