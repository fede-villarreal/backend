import CartController from "./cart.controller.js";
import Products from "../dao/dbManagers/product_manager.js";

const productManager = new Products();

export default class ViewsController {

    static async getCart(req, res, next) {
        try {
            const cart = CartController.getCartById
            console.log(cart)

            let products = cart.products.map(p => ({
                ...p.product.toObject(),
                quantity: p.quantity
            }))
        
            res.render('cart', {products})
        } catch (error) {
            next (error)
        }
    }

    static async login (req, res, next) {
        try {
            res.render('login')
        } catch (error) {
            next (error)
        }
    }

    static async faillogin(req, res, next) {
        try {
            res.render('faillogin')
        } catch (error) {
            next (error)
        }
    }

    static async register(req, res, next) {
        try {
            res.render('register')
        } catch (error) {
            next (error)
        }
    }
    static async failRegister(req, res, next) {
        try {
            res.render('failregister')
        } catch (error) {
            next (error)
        }
    }

    static async getProducts(req, res, next) {
        try {
            if (!req.user) return res.status(401).send('Error de autorización. Necesita loguearse primero!')
            const { limit = 10, page = 1, category, status, sort } = req.query;
            let query = {}
            if (category && status) {
                query = { category, status }
            } else if (category) {
                query = { category }
            } else if (status) {
                query = { status }
            }
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await productManager.getProductsPaginate(limit, page, query, sort);
            let products = docs;
            res.render('home', {
                user: req.session.user,
                products,
                status,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            })
        } catch (error) {
            next (error)
        }
    }

    static async realTimeProducts(req, res, next) {
        try {
            const products = ProductController.getProducts
            res.render('realTimeProducts', {products})
        } catch (error) {
            next (error)
        }
    }

    static async (req, res, next) {
        try {

        } catch (error) {
            next (error)
        }
    }

}