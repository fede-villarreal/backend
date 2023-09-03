import Products from "../dao/dbManagers/product_manager.js";

const productManager = new Products();

export default class ProductController {

    static async getProducts(req, res, next) {
        try {
            const { limit = 10, page = 1, category, status, sort } = req.query;
            let query = {}
            if (category && status) {
                query = { category, status }
            } else if (category) {
                query = { category }
            } else if (status) {
                query = { status }
            }

            const products = await productManager.getProductsPaginate(limit, page, query, sort);
            if (!products) return res.send({ status: 'error', error: "No se encontraron productos" })

            res.send({ status: 'success', payload: products })
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next) {
        try {
            let { pid } = req.params
            if (pid.length !== 24) return res.send({ status: 'error', error: "El id del producto debe tener 24 digitos" })

            const product = await productManager.getProduct(pid)
            if (!product) return res.send({ status: 'error', error: "Producto no encontrado" })

            res.send({ status: 'success', payload: product })
        } catch (error) {
            next(error)
        }
    }

    static async createProduct(req, res, next) {
        try {
            const { title, description, code, price, stock, category, status, thumbnails } = req.body;
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

            if (!title || !description || !code || !price || !stock || !category) return res.send({ status: 'error', error: "Los campos title, description, code, price, stock y category son obligatorios" })

            const result = await productManager.saveProducts(newProduct)
            if (!result) return res.send({ status: 'error', error: "No se pudo crear el producto" })

            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        try {
            let { pid } = req.params;
            if (pid.length !== 24) return res.send({ status: 'error', error: "El id del producto debe tener 24 digitos" })

            let fieldsToUpdate = req.body;

            const products = await productManager.getAll()
            const productIndex = await products.findIndex(p => String(p._id) === pid)

            let update = { ...products[productIndex], ...fieldsToUpdate }

            let result = await productManager.updateProduct(pid, update)
            if (!result) return res.send({ status: 'error', error: "No se pudo actualizar el producto" })

            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            let { pid } = req.params;
            if (pid.length !== 24) return res.send({ status: 'error', error: "El id del producto debe tener 24 digitos" })

            const product = await productManager.getProduct(pid)
            if (!product) return res.send({ status: 'error', error: "Producto no encontrado" })

            let result = await productManager.deleteProduct(pid)
            if (!result) return res.send({ status: 'error', error: "No se pudo eliminar el producto" })

            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

}