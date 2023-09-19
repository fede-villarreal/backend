import Products from "../dao/dbManagers/product_manager.js";
import { generateProducts } from "../utils/utils.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { validateIdErrorInfo, getProductsErrorInfo, getProductByIdErrorInfo, createProductErrorInfo, requiredFieldsToCreateProductErrorInfo, updateProductErrorInfo, deleteProductErrorInfo } from './errors/info.js'

const productManager = new Products();

export default class ProductService {

    async getProducts(limit, page, category, status, sort) {
        let query = {}
        if (category && status) {
            query = { category, status }
        } else if (category) {
            query = { category }
        } else if (status) {
            query = { status }
        }

        const products = await productManager.getProductsPaginate(limit, page, query, sort);
        if (!products) CustomError.createError({
            name: 'Error al obtener los productos',
            cause: getProductsErrorInfo(),
            message: 'Ocurrio un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return products;
    }

    async getProductById(pid) {
        if (pid.length !== 24) CustomError.createError({
            name: 'Id del producto incorrecto',
            cause: validateIdErrorInfo(pid),
            message: 'Error tratando de obtener producto',
            code: EErrors.BAD_REQUEST
        })

        const product = await productManager.getProduct(pid)
        if (!product) CustomError.createError({
            name: 'Id del producto incorrecto',
            cause: getProductByIdErrorInfo(pid),
            message: 'El producto solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        return product;
    }

    async createProduct(title, description, code, price, stock, category, status, thumbnails) {
        let newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
            status,
            thumbnails
        }

        if (!title || !description || !code || !price || !stock || !category) CustomError.createError({
            name: 'Campos incompletos',
            cause: requiredFieldsToCreateProductErrorInfo(title, description, code, price, stock, category),
            message: 'existen campos obligatorios sin completar',
            code: EErrors.BAD_REQUEST
        })

        const result = await productManager.saveProducts(newProduct)
        if (!result) CustomError.createError({
            name: 'Error al crear el producto',
            cause: createProductErrorInfo(newProduct),
            message: 'Ocurrio un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result;
    }

    async updateProduct(pid, fieldsToUpdate) {
        if (pid.length !== 24) CustomError.createError({
            name: 'Id del producto incorrecto',
            cause: validateIdErrorInfo(pid),
            message: 'Error tratando de obtener producto',
            code: EErrors.BAD_REQUEST
        })

        const products = await productManager.getAll()
        const productIndex = await products.findIndex(p => String(p._id) === pid)

        let update = { ...products[productIndex], ...fieldsToUpdate }

        let result = await productManager.updateProduct(pid, update)
        if (!result) CustomError.createError({
            name: 'Error al actualizar el producto',
            cause: updateProductErrorInfo(pid, update),
            message: 'Ocurrio un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result;
    }

    async deleteProduct(pid) {
        if (pid.length !== 24) CustomError.createError({
            name: 'Id del producto incorrecto',
            cause: validateIdErrorInfo(pid),
            message: 'Error tratando de obtener producto',
            code: EErrors.BAD_REQUEST
        })

        const product = await productManager.getProduct(pid)
        if (!product) CustomError.createError({
            name: 'Id del producto incorrecto',
            cause: getProductByIdErrorInfo(pid),
            message: 'El producto solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        let result = await productManager.deleteProduct(pid)
        if (!result) CustomError.createError({
            name: 'Error al eliminar el producto',
            cause: deleteProductErrorInfo(pid),
            message: 'Ocurrio un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result;
    }

    async mockingProducts() {
        let products = [];

        for (let i = 0; i < 100; i++) {
            products.push(generateProducts())
        }

        return products;
    }
}