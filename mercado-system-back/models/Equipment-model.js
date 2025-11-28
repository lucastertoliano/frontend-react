import mongoose from 'mongoose'

const Schema = mongoose.Schema({

    name: {type: String, required: true},
    price: {type: Number, required: true},
    code: {type: String, required: true, unique: true},
    quantity: {type: Number, required: true, default: 0},
    dateInitial: {type: Date, required: true},
    dateFinal: {type: Date,required: true}
})

export default mongoose.model('equipment', Schema)