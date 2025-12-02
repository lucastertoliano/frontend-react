import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./gerenciamentoUsuario.css";

const API_URL = 'http://localhost:3001/api/users';

const GerenciamentoUsuario = () => {
    const navigate = useNavigate(); 
    
    const [usuarios, setUsuarios] = useState<any[]>([]);
    
    const [novoUsuario, setNovoUsuario] = useState({
        name: "",
        email: "",
        password: "",
        cpf: "",
        identifier: "",
    });

    const fetchUsers = async () => {
        const token = localStorage.getItem('jwtToken'); 
        if (!token) return;

        try {
            const response = await axios.get(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNovoUsuario({
            ...novoUsuario,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdicionarUsuario = async () => {
        const token = localStorage.getItem('jwtToken'); 
        
        if (!novoUsuario.name || !novoUsuario.email || !novoUsuario.cpf || !novoUsuario.password) {
            alert("Nome, E-mail, CPF e Senha são obrigatórios para novo usuário.");
            return;
        }

        try {
            await axios.post(API_URL, novoUsuario, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("Usuário adicionado com sucesso!");
            
            fetchUsers();
            setNovoUsuario({ name: "", email: "", password: "", cpf: "", identifier: "" });

        } catch (error: any) {
            console.error('Erro na submissão:', error);
            const msg = error.response?.data?.message || 'Falha na requisição.';
            alert(`Erro: ${msg}`);
        }
    };
    
    const verDetalhes = (usuario: any) => {
        navigate(`/detalhesUsuario/${usuario._id}`);  
    };

    const removerUsuario = async (id: string, name: string) => {
        const token = localStorage.getItem('jwtToken'); 
        if (!token || !window.confirm(`Tem certeza que deseja remover ${name}?`)) return;

        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert(`Usuário ${name} removido com sucesso.`);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao remover:', error);
            alert('Falha ao remover usuário.');
        }
    };


    return (
        <div className="usuarios">
            <h2>Gerenciamento de Usuários</h2>

            <div className="form-usuario">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome Completo"
                    value={novoUsuario.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={novoUsuario.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={novoUsuario.password}
                    onChange={handleChange}
                    required={true}
                />
                <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    value={novoUsuario.cpf}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="identifier"
                    placeholder="Identificador/Cargo"
                    value={novoUsuario.identifier}
                    onChange={handleChange}
                />
                
                <button className="adicionar" onClick={handleAdicionarUsuario}>
                    Adicionar Usuário
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Identificador/Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario._id}>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.identifier}</td>
                            <td>
                                <button className="editar" onClick={() => verDetalhes(usuario)}>
                                    Detalhes
                                </button>
                                <button className="remover" onClick={() => removerUsuario(usuario._id, usuario.name)}>
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