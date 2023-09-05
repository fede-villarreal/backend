import Carts from "../dao/dbManagers/cart_manager.js";
import Products from "../dao/dbManagers/product_manager.js";
import UserDTO from "../dtos/user.dto.js";

const cartManager = new Carts();
const productManager = new Products();

export default class ViewsController {

    static async getCart(req, res, next) {
        try {
            let { cid } = req.params;
            if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })

            const cart = await cartManager.getCart(cid)
            if (!cart) return res.send({ status: 'error', error: "Carrito no encontrado" })

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
            const { first_name, last_name, age, email} = req.user;
            const user = new UserDTO(first_name, last_name, age, email)
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
                user,
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
            const products = await productManager.getAll();
            res.render('realTimeProducts', {products})
        } catch (error) {
            next (error)
        }
    }

    static async current (req, res, next) {
        try {
            const { first_name, last_name, age, email} = req.user;
            const user = new UserDTO(first_name, last_name, age, email)
            res.render('current', {user})
        } catch (error) {
            next (error)
        }
    }

}