import Carts from "../dao/dbManagers/cart_manager.js";
import Products from "../dao/dbManagers/product_manager.js";
import Tickets from "../dao/dbManagers/ticket_manager.js";

const cartManager = new Carts();
const productManager = new Products();
const ticketManager = new Tickets();

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
        if (!exist) throw new Error('El Id de algún producto es incorrecto')

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
        try {
            if (cid.length !== 24) {
                throw new Error("El id del carrito debe tener 24 dígitos");
            }

            let cart = await cartManager.getCart(cid);
            if (!cart) {
                throw new Error('No se pudo encontrar el carrito');
            }

            let products = [...cart.products];
            let purchasedProducts = [];

            async function updateProductsAndCart() {
                for (let p of products) {
                    try {
                        let product = await productManager.getProduct(String(p.product._id));
                        let productQuantity = p.quantity;

                        if (product.stock >= productQuantity) {
                            product.stock -= productQuantity;
                            await productManager.updateProduct(product._id, product);

                            purchasedProducts.push({
                                product: p.product,
                                quantity: p.quantity,
                            });

                            await cartManager.deleteProductToCart(cid, String(product._id));
                        }
                    } catch (error) {
                        throw new Error('Error al actualizar el stock de productos y el carrito');
                    }
                }
            }

            await updateProductsAndCart();

            const purchaserMail = await cartManager.getPurchaser(cart);

            const amount = purchasedProducts.reduce((acc, p) => {
                return acc + p.product.price * p.quantity;
            }, 0);

            const productsDetail = purchasedProducts.map((p) => {
                return {
                    product: String(p.product._id),
                    quantity: p.quantity
                };
            });

            const ticket = await ticketManager.addTicket({
                amount: amount,
                purchaser: purchaserMail,
                products: productsDetail
            });

            if (!ticket) {
                throw new Error("No se pudo crear el ticket");
            }

            return ticket;

        } catch (error) {
            throw error;
        }
    }


}