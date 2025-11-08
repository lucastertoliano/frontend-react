import React, { useState } from "react";
import "./detalhesUsuario.css";

const DetalhesUsuario = () => {
  const [usuarios, setUsuarios] = useState([
    {
      nome: "João Silva",
      cargo: "Caixa",
      email: "joao@empresa.com",
      telefone: "(11) 99999-8888",
      cpf: "123.456.789-00",
      dataAdmissao: "2022-03-15",
      nivel: "Comum",
      status: "Ativo",
    },
    {
      nome: "Maria Souza",
      cargo: "Gerente",
      email: "maria@empresa.com",
      telefone: "(11) 98888-7777",
      cpf: "987.654.321-00",
      dataAdmissao: "2021-09-02",
      nivel: "Admin",
      status: "Ativo",
    },
    {
      nome: "Carlos Pereira",
      cargo: "Repositor",
      email: "carlos@empresa.com",
      telefone: "(11) 97777-6666",
      cpf: "456.789.123-00",
      dataAdmissao: "2023-01-10",
      nivel: "Comum",
      status: "Inativo",
    },
  ]);

  return (
    <div className="detalhes-usuarios">
      <h2>Detalhes dos Funcionários</h2>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Data de Admissão</th>
            <th>Nível</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr
              key={index}
              className={usuario.status === "Inativo" ? "inativo" : ""}
            >
              <td>{usuario.nome}</td>
              <td>{usuario.cargo}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.cpf}</td>
              <td>{new Date(usuario.dataAdmissao).toLocaleDateString("pt-BR")}</td>
              <td>{usuario.nivel}</td>
              <td>{usuario.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetalhesUsuario;
