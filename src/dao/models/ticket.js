import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: [true, 'El código del ticket es requerido']
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    purchaser: {
        type: String,
        required: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
})
ticketSchema.pre('findOne', function(){
    this.populate('products.product')
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel;