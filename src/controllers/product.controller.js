import ProductService from "../services/product.service.js";

const productService = new ProductService();

export default class ProductController {

    static async getProducts(req, res, next) {
        try {
            const { limit = 10, page = 1, category, status, sort } = req.query;
            const products = await productService.getProducts(limit, page, category, status, sort);
            res.send({ status: 'success', payload: products })
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next) {
        try {
            let { pid } = req.params
            const product = await productService.getProductById(pid)
            res.send({ status: 'success', payload: product })
        } catch (error) {
            next(error)
        }
    }

    static async createProduct(req, res, next) {
        try {
            const { title, description, code, price, stock, category, status, thumbnails } = req.body;
            const result = await productService.createProduct(title, description, code, price, stock, category, status, thumbnails)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        try {
            let { pid } = req.params;
            let fieldsToUpdate = req.body;
            let result = await productService.updateProduct(pid, fieldsToUpdate)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            let { pid } = req.params;
            let result = await productService.deleteProduct(pid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async mockingProducts(req, res, next) {
        try {
            let result = await productService.mockingProducts()
            res.send({status: 'success', payload: result})
        } catch (error) {
            next(error)
        }
    }

}