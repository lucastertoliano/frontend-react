import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./detalhesUsuario.css";

const API_URL = 'http://localhost:3001/api/users'; 

const DetalhesUsuario = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('jwtToken'); 
        
        if (!token || !id) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsuario(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do usuário:', error);
            setUsuario(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]); 

    if (loading) {
        return <div className="detalhes-usuarios">Carregando detalhes do funcionário...</div>;
    }

    if (!usuario) {
        return <div className="detalhes-usuarios">Funcionário não encontrado ou não autorizado.</div>;
    }

    const dataCriacao = usuario.createdAt ? new Date(usuario.createdAt).toLocaleDateString("pt-BR") : 'N/A';

    return (
        <div className="detalhes-usuarios">
            <h2>Detalhes do Funcionário</h2>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Identificador/Cargo</th>
                        <th>Status</th>
                        <th>Data Criação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={usuario.status === "Inativo" ? "inativo" : ""}>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.cpf}</td>
                        <td>{usuario.identifier || 'Não Definido'}</td>
                        <td>Ativo</td> 
                        <td>{dataCriacao}</td>
                    </tr>
                </tbody>
            </table>

            {}
            <button 
                className="btn-editar-usuario"
                onClick={() => navigate(`/editarUsuario/${id}`)}
            >
                Editar Usuário
            </button>

        </div>
    );
};

export default DetalhesUsuario;