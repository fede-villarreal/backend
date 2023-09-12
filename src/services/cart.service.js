import Carts from "../dao/dbManagers/cart_manager.js";
import Products from "../dao/dbManagers/product_manager.js";
import Tickets from "../dao/dbManagers/ticket_manager.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { validateIdErrorInfo, getCartErrorInfo, getProductByIdErrorInfo, addProductToCartErrorInfo, deleteProductToCartErrorInfo, addMultipleProductsToCartErrorInfo, updateProductQuantityErrorInfo, emptyCartErrorInfo, purchaseErrorInfo } from './errors/info.js';

const cartManager = new Carts();
const productManager = new Products();
const ticketManager = new Tickets();

export default class CartService {

    async getCartById(cid) {
        if (cid.length !== 24) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: validateIdErrorInfo(cid),
            message: 'Error tratando de obtener carrito',
            code: EErrors.BAD_REQUEST
        })

        const cart = await cartManager.getCart(cid)
        if (!cart) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: getCartErrorInfo(cid),
            message: 'El carrito solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        return cart
    }

    async createCart(products) {
        const result = await cartManager.addCart(products)
        if (!result) throw new Error("No se pudo crear el carrito")

        return result
    }

    async addProductToCart(cid, pid) {
        if (cid.length !== 24) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: validateIdErrorInfo(cid),
            message: 'Error tratando de obtener carrito',
            code: EErrors.BAD_REQUEST
        })
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

        const cart = await cartManager.getCart(cid)
        if (!cart) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: getCartErrorInfo(cid),
            message: 'El carrito solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        let result = await cartManager.addProductToCart(cid, pid)
        if (!result) CustomError.createError({
            name: 'Error al agregar el producto al carrito',
            cause: addProductToCartErrorInfo(cid, pid),
            message: 'Ocurrio un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result
    }

    async deleteProductToCart(cid, pid) {
        if (cid.length !== 24) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: validateIdErrorInfo(cid),
            message: 'Error tratando de obtener carrito',
            code: EErrors.BAD_REQUEST
        })
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

        const cart = await cartManager.getCart(cid)
        if (!cart) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: getCartErrorInfo(cid),
            message: 'El carrito solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        let result = await cartManager.deleteProductToCart(cid, pid)
        if (!result) CustomError.createError({
            name: 'Error al borrar producto del carrito',
            cause: deleteProductToCartErrorInfo(cid, pid),
            message: 'Ocurrio un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result
    }


    async addMultipleProductsToCart(cid, products) {
        if (cid.length !== 24) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: validateIdErrorInfo(cid),
            message: 'Error tratando de obtener carrito',
            code: EErrors.BAD_REQUEST
        })

        const cart = await cartManager.getCart(cid)
        if (!cart) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: getCartErrorInfo(cid),
            message: 'El carrito solicitado no existe',
            code: EErrors.NOT_FOUND
        })

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
        if (!result) CustomError.createError({
            name: 'Error al agregar productos al carrito',
            cause: addMultipleProductsToCartErrorInfo(cid, products),
            message: 'Ocurrió un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result
    }

    async updateProductQuantity(cid, pid, productQuantity) {
        if (cid.length !== 24) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: validateIdErrorInfo(cid),
            message: 'Error tratando de obtener carrito',
            code: EErrors.BAD_REQUEST
        })
        if (pid.length !== 24) CustomError.createError({
            name: 'Id del producto incorrecto',
            cause: validateIdErrorInfo(pid),
            message: 'Error tratando de obtener producto',
            code: EErrors.BAD_REQUEST
        })

        const cart = await cartManager.getCart(cid)
        if (!cart) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: getCartErrorInfo(cid),
            message: 'El carrito solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        const product = await productManager.getProduct(pid)
        if (!product) CustomError.createError({
            name: 'Id del producto incorrecto',
            cause: getProductByIdErrorInfo(pid),
            message: 'El producto solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        let result = await cartManager.updateQuantity(cid, pid, productQuantity)
        if (!result) CustomError.createError({
            name: 'Error al actualizar productos en el carrito',
            cause: updateProductQuantityErrorInfo(cid, pid, productQuantity),
            message: 'Ocurrió un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result
    }

    async emptyCart(cid) {
        if (cid.length !== 24) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: validateIdErrorInfo(cid),
            message: 'Error tratando de obtener carrito',
            code: EErrors.BAD_REQUEST
        })

        const cart = await cartManager.getCart(cid)
        if (!cart) CustomError.createError({
            name: 'Id del carrito incorrecto',
            cause: getCartErrorInfo(cid),
            message: 'El carrito solicitado no existe',
            code: EErrors.NOT_FOUND
        })

        let result = await cartManager.emptyCart(cid)
        if (!result) CustomError.createError({
            name: 'Error al limpiar el carrito',
            cause: emptyCartErrorInfo(cid),
            message: 'Ocurrió un error en el servidor',
            code: EErrors.INTERNAL_SERVER_ERROR
        })

        return result
    }

    async purchase(cid) {
        try {
            if (cid.length !== 24) {
                CustomError.createError({
                    name: 'Id del carrito incorrecto',
                    cause: validateIdErrorInfo(cid),
                    message: 'Error tratando de obtener carrito',
                    code: EErrors.BAD_REQUEST
                })
            }

            let cart = await cartManager.getCart(cid);
            if (!cart) {
                CustomError.createError({
                    name: 'Id del carrito incorrecto',
                    cause: getCartErrorInfo(cid),
                    message: 'El carrito solicitado no existe',
                    code: EErrors.NOT_FOUND
                })
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
                CustomError.createError({
                    name: 'Error al crear el ticket',
                    cause: purchaseErrorInfo(),
                    message: 'Ocurrió un error en el servidor',
                    code: EErrors.INTERNAL_SERVER_ERROR
                })
            }

            return ticket;

        } catch (error) {
            throw error;
        }
    }


}