import Products from "../dao/dbManagers/product_manager.js";

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
        if (!products) throw new Error("No se encontraron productos")

        return products;
    }

    async getProductById(pid) {
        if (pid.length !== 24) throw new Error("El id del producto debe tener 24 digitos")

        const product = await productManager.getProduct(pid)
        if (!product) throw new Error("Producto no encontrado")

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

        if (!title || !description || !code || !price || !stock || !category) throw new Error("Los campos title, description, code, price, stock y category son obligatorios")

        const result = await productManager.saveProducts(newProduct)
        if (!result) throw new Error("No se pudo crear el producto")

        return result;
    }

    async updateProduct(pid, fieldsToUpdate) {
        if (pid.length !== 24) throw new Error("El id del producto debe tener 24 digitos")

        const products = await productManager.getAll()
        const productIndex = await products.findIndex(p => String(p._id) === pid)

        let update = { ...products[productIndex], ...fieldsToUpdate }

        let result = await productManager.updateProduct(pid, update)
        if (!result) throw new Error("No se pudo actualizar el producto")

        return result;
    }

    async deleteProduct(pid) {
        if (pid.length !== 24) throw new Error("El id del producto debe tener 24 digitos")

        const product = await productManager.getProduct(pid)
        if (!product) throw new Error("Producto no encontrado")

        let result = await productManager.deleteProduct(pid)
        if (!result) throw new Error("No se pudo eliminar el producto")

        return result;
    }
}