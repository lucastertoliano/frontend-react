import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
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
    expirationDate: { 
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true, 
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);