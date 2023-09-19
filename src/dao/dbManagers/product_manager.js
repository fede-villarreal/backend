import productModel from "../models/products.js";

export default class Products {

    getAll = async() => {
        let products = await productModel.find().lean()
        return products
    }

    getProductsPaginate = async(limit, page, query, sort) => {
        let products = [];

        if (sort) {
            products = await productModel
            .paginate(query, {limit, page, lean: true, sort: { price: sort} })
        } else {
            products = await productModel
            .paginate(query, {limit, page, lean: true })
        }

        return products;
    }

    getProduct = async (pid) => {
        let product = await productModel.findOne({_id: pid})
        return product
    }

    saveProducts = async (product) => {
        let result = await productModel.create(product)
        return result
    }

    updateProduct = async (pid, update) => {
        let updatedProduct = await productModel.updateOne({_id: pid}, update)
        return updatedProduct
    }

    deleteProduct = async (pid) => {
        let deletedProduct = await productModel.deleteOne({_id: pid})
        return deletedProduct
    }
}