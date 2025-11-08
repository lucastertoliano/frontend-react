import React, { useState } from "react";
import "./gerenciamentoUsuario.css";

const GerenciamentoUsuario = () => {
  const [usuarios, setUsuarios] = useState([
    { nome: "João Silva", cargo: "Caixa", email: "joao@empresa.com", nivel: "Comum", status: "Ativo" },
    { nome: "Maria Souza", cargo: "Gerente", email: "maria@empresa.com", nivel: "Admin", status: "Ativo" },
  ]);

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    cargo: "",
    email: "",
    nivel: "Comum",
    status: "Ativo",
  });

  const [editandoIndex, setEditandoIndex] = useState(null);

  const handleChange = (e) => {
    setNovoUsuario({
      ...novoUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const adicionarUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.cargo || !novoUsuario.email) return;
    setUsuarios([...usuarios, novoUsuario]);
    setNovoUsuario({ nome: "", cargo: "", email: "", nivel: "Comum", status: "Ativo" });
  };

  const editarUsuario = (index) => {
    setEditandoIndex(index);
    setNovoUsuario(usuarios[index]);
  };

  const salvarEdicao = () => {
    const listaAtualizada = usuarios.map((u, i) => (i === editandoIndex ? novoUsuario : u));
    setUsuarios(listaAtualizada);
    setEditandoIndex(null);
    setNovoUsuario({ nome: "", cargo: "", email: "", nivel: "Comum", status: "Ativo" });
  };

  const removerUsuario = (index) => {
    const novaLista = usuarios.filter((_, i) => i !== index);
    setUsuarios(novaLista);
  };

  return (
    <div className="usuarios">
      <h2>Gerenciamento de Usuários</h2>

      <div className="form-usuario">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoUsuario.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cargo"
          placeholder="Cargo"
          value={novoUsuario.cargo}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={novoUsuario.email}
          onChange={handleChange}
        />
        <select name="nivel" value={novoUsuario.nivel} onChange={handleChange}>
          <option value="Comum">Comum</option>
          <option value="Admin">Admin</option>
        </select>
        <select name="status" value={novoUsuario.status} onChange={handleChange}>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        {editandoIndex !== null ? (
          <button className="editar" onClick={salvarEdicao}>
            Salvar Alterações
          </button>
        ) : (
          <button className="adicionar" onClick={adicionarUsuario}>
            Adicionar Usuário
          </button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Email</th>
            <th>Nível</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nome}</td>
              <td>{usuario.cargo}</td>
              <td>{usuario.email}</td>
              <td>{usuario.nivel}</td>
              <td>{usuario.status}</td>
              <td>
                <button className="editar" onClick={() => editarUsuario(index)}>
                  Editar
                </button>
                <button className="remover" onClick={() => removerUsuario(index)}>
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

export default GerenciamentoUsuario;
