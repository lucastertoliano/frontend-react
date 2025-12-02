import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./EditarUsuario.css";

const API_URL = 'http://localhost:3001/api/users';

interface UserData {
    name: string;
    email: string;
    cpf: string;
    identifier: string;
}

const EditarUsuario = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        cpf: '',
        identifier: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token || !id) {
                setError("Token ou ID do usuário ausente.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const { name, email, cpf, identifier } = response.data;
                setUserData({
                    name: name || '',
                    email: email || '',
                    cpf: cpf || '',
                    identifier: identifier || '',
                });
            } catch (err) {
                console.error('Erro ao carregar dados para edição:', err);
                setError('Não foi possível carregar os dados do funcionário.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('jwtToken');

        try {

            await axios.put(`${API_URL}/${id}`, userData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            alert('Funcionário atualizado com sucesso!');

            navigate(`/detalhesUsuario/${id}`);

        } catch (err) {
            console.error('Erro ao atualizar funcionário:', err);
            setError('Erro ao salvar as alterações. Verifique o console.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="editar-usuario-container">Carregando formulário de edição...</div>;
    }

    if (error) {
        return <div className="editar-usuario-container">Erro: {error}</div>;
    }

    return (
        <div className="editar-usuario-container">
            <h2>Editar Funcionário: {userData.name}</h2>
            <form onSubmit={handleSubmit}>

                <label>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />

                <label>CPF:</label>
                <input
                    type="text"
                    name="cpf"
                    value={userData.cpf}
                    onChange={handleChange}
                    required
                />

                <label>Identificador/Cargo:</label>
                <input
                    type="text"
                    name="identifier"
                    value={userData.identifier}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                <button type="button" onClick={() => navigate(-1)} className="btn-cancelar">
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default EditarUsuario;