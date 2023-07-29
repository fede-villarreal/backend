import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El nombre del producto es requerido']
    },
    description: {
        type: String,
        required: [true, 'La descripción del producto es requerida']
    },
    code: {
        type: String,
        required: [true, 'El código del producto es requerido']
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es requerido']
    },
    stock: {
        type: Number,
        required: [true, 'El stock del producto es requerido']
    },
    category: {
        type: String,
        required: [true, 'La categoría del producto es requerida']
    },
    status: {
        type: Boolean,
        default: true
    },
    thumbnails: {
        type: Array,
        default: []
    }
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel;