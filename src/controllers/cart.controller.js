import CartService from "../services/cart.service.js";

const cartService = new CartService();

export default class CartController {

    static async getCartById(req, res, next) {
        try {
            let { cid } = req.params;
            const cart = await cartService.getCartById(cid)
            res.send({ status: 'success', payload: cart })
        } catch (error) {
            next(error)
        }
    }

    static async addProductToCart(req, res, next) {
        try {
            let { cid, pid } = req.params;
            let result = await cartService.addProductToCart(cid, pid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductToCart(req, res, next) {
        try {
            let { cid, pid } = req.params;
            let result = await cartService.deleteProductToCart(cid, pid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }


    static async addMultipleProductsToCart(req, res, next) {
        try {
            let { cid } = req.params;
            let products = req.body;
            let result = await cartService.addMultipleProductsToCart(cid, products)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async updateProductQuantity(req, res, next) {
        try {
            let { cid, pid } = req.params;
            let productQuantity = req.body;
            let result = await cartService.updateProductQuantity(cid, pid, productQuantity)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async emptyCart(req, res, next) {
        try {
            let { cid } = req.params;
            let result = await cartService.emptyCart(cid)
            res.send({ status: 'success', payload: result })
        } catch (error) {
            next(error)
        }
    }

    static async purchase(req, res, next) {
        try{
            let { cid } = req.params;
            let result = await cartService.purchase(cid)
            res.send({status: 'success', payload: result})
        } catch (error) {
            next(error)
        }
    }

}