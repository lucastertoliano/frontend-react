import './GerenciamentoProduto.css';

const GerenciamentoProduto = () => {
  return (
    <div className="produtos">
      <h2>Gerenciamento de Produtos</h2>

      <div className="form-produto">
        <input type="text" placeholder="Nome do Produto" />
        <input type="number" placeholder="Preço (R$)" />
        <input type="text" placeholder="Tipo" />
        <input type="number" placeholder="Quantidade" />
        <input type="date" placeholder="Data de Validade" />
        <button>Salvar</button>
      </div>

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
  )
}

export default GerenciamentoProduto 