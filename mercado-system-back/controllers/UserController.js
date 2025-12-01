import User from '../models/User-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10; 
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao_muito_forte'; 

const controller = {
    //post novo úsuario
    createUser: async (req, res) => {
        const { name, email, password, cpf, identifier } = req.body;

        if (!email || !password || !name || !cpf) {
            return res.status(400).json({ message: "Por favor, preencha todos os campos obrigatórios." });
        }

        try {

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                cpf,
                identifier 
            });

            await newUser.save();
            const userResponse = newUser.toObject();
            delete userResponse.password;

            return res.status(201).json({ 
                message: "Usuário cadastrado com sucesso!", 
                user: userResponse
            });

        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({ message: "Email ou CPF já cadastrado." });
            }
            return res.status(500).json({ message: "Erro ao cadastrar usuário.", detail: error.message });
        }
    },
        
    //rota de login post
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Credenciais inválidas." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Credenciais inválidas." });
            }

            // Gerar o Token JWT
            const token = jwt.sign(
                { id: user._id, email: user.email }, 
                JWT_SECRET, 
                { expiresIn: '1h' }
            );

            return res.status(200).json({ 
                message: "Login bem-sucedido!", 
                token,
                userName: user.name,
                userEmail: user.email,
                userPicture: user.profilePicture 
            });

        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor.", detail: error.message });
        }
    },

    //get All
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password'); // Exclui a senha
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar usuários.", detail: error.message });
        }
    },

    //get Id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar usuário.", detail: error.message });
        }
    },

    //put Id
    updateUser: async (req, res) => {
        const { password, ...updates } = req.body;
        
        try {
            //criptoografia da senha 
            if (password) {
                updates.password = await bcrypt.hash(password, saltRounds);
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            ).select('-password');

            if (!updatedUser) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            return res.status(200).json({ message: "Usuário atualizado com sucesso!", user: updatedUser });

        } catch (error) {
            return res.status(400).json({ message: "Erro ao atualizar usuário.", detail: error.message });
        }
    },

    //delete por Id
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            return res.status(200).json({ message: "Usuário removido com sucesso." });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover usuário.", detail: error.message });
        }
    },

    uploadProfilePicture: async (req, res) => {
        const userId = req.user.id; 

        if (!req.file) {

            if (req.fileValidationError) {
                return res.status(400).json({ message: req.fileValidationError });
            }
            return res.status(400).json({ message: 'Nenhum arquivo de imagem enviado.' });
        }

        try {
            const filePath = req.file.path; 

            //atualizar foto de usuário
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePicture: filePath },
                { new: true }
            ).select('-password');

            if (!updatedUser) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            return res.status(200).json({ 
                message: 'Foto de perfil atualizada com sucesso!', 
                path: filePath 
            });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar foto de perfil.", detail: error.message });
        }
    }
};

export default controller;