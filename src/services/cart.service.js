import Carts from "../dao/dbManagers/cart_manager.js";
import Products from "../dao/dbManagers/product_manager.js";

const cartManager = new Carts();
const productManager = new Products();

export default class CartService {

    async getCartById(cid) {
        if (cid.length !== 24) throw new Error("El id del carrito debe tener 24 digitos")

        const cart = await cartManager.getCart(cid)
        if (!cart) throw new Error("Carrito no encontrado")

        return cart
    }

    async createCart(products) {
        const result = await cartManager.addCart(products)
        if (!result) throw new Error("No se pudo crear el carrito")

        return result
    }

    async addProductToCart(cid, pid) {
        if (cid.length !== 24) throw new Error("El id del carrito debe tener 24 digitos")
        if (pid.length !== 24) throw new Error("El id del producto debe tener 24 digitos")

        const product = await productManager.getProduct(pid)
        if (!product) throw new Error("Producto no encontrado")

        const cart = await cartManager.getCart(cid)
        if (!cart) throw new Error("Carrito no encontrado")

        let result = await cartManager.addProductToCart(cid, pid)
        if (!result) throw new Error("No se agregar el producto al carrito")

        return result
    }

    async deleteProductToCart(cid, pid) {
        if (cid.length !== 24) throw new Error("El id del carrito debe tener 24 digitos")
        if (pid.length !== 24) throw new Error("El id del producto debe tener 24 digitos")

        const product = await productManager.getProduct(pid)
        if (!product) throw new Error("Producto no encontrado")

        const cart = await cartManager.getCart(cid)
        if (!cart) throw new Error("Carrito no encontrado")

        let result = await cartManager.deleteProductToCart(cid, pid)
        if (!result) throw new Error("No se borrar el producto del carrito")

        return result
    }


    async addMultipleProductsToCart(cid, products) {
        if (cid.length !== 24) throw new Error("El id del carrito debe tener 24 digitos")

        const cart = await cartManager.getCart(cid)
        if (!cart) throw new Error("Carrito no encontrado")

        const evaluation = async (listOfProducts) => {
            for (let i = 0; i < listOfProducts.length; i++) {
                if (listOfProducts[i].product.length !== 24) return false
                let product = await productManager.getProduct(listOfProducts[i].product)
                if (!product) return false
            }
            return true
        }

        const exist = await evaluation(products)
        if(!exist) throw new Error('El Id de algún producto es incorrecto')

        let result = await cartManager.addMultipleProducts(cid, products)
        if (!result) throw new Error("No se pudo actualizar la lista de productos del carrito")

        return result
    }

    async updateProductQuantity(cid, pid, productQuantity) {
        if (cid.length !== 24) throw new Error("El id del carrito debe tener 24 digitos")
        if (pid.length !== 24) throw new Error("El id del producto debe tener 24 digitos")

        const cart = await cartManager.getCart(cid)
        if (!cart) throw new Error('No se pudo encontrar el carrito')

        const product = await productManager.getProduct(pid)
        if (!product) throw new Error("Producto no encontrado")

        let result = await cartManager.updateQuantity(cid, pid, productQuantity)
        if (!result) throw new Error("No se pudo actualizar la cantidad de productos en el carrito")

        return result
    }

    async emptyCart(cid) {
        if (cid.length !== 24) throw new Error("El id del carrito debe tener 24 digitos")

        const cart = await cartManager.getCart(cid)
        if (!cart) throw new Error('No se pudo encontrar el carrito')

        let result = await cartManager.emptyCart(cid)
        if (!result) throw new Error("No se pudo vaciar el carrito")

        return result
    }

    async purchase(cid) {
        if (cid.length !== 24) throw new Error("El id del carrito debe tener 24 digitos")

        const cart = await cartManager.getCart(cid)
        if (!cart) throw new Error('No se pudo encontrar el carrito')

        const result = await cartManager.purchase(cid)
        if (!result) throw new Error("No se pudo finalizar la compra")

        return result;
    }

}