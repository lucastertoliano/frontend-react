import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    //Preço Atual
    currentPrice: { 
        type: Number,
        required: true,
        min: 0
    },
    promotionPrice: { 
        type: Number,
        required: false,
        default: null
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    //Data de validade
    expirationDate: { 
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);