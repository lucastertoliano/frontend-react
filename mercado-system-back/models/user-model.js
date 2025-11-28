import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    // Requisitos mínimos(funcionário)
    identifier: { 
        type: String,
        required: false, 
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true 
    },
    password: { 
        type: String,
        required: true,
        minlength: 6 
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 11
    },
    //guardar foto
    profilePicture: {
        type: String,
        required: false 
    }
}, {
    timestamps: true // Adiciona 'createdAt' e 'updatedAt' automaticamente
});

export default mongoose.model('User', UserSchema);