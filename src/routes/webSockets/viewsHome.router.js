import { Router } from 'express';
import Products from '../../dao/dbManagers/product_manager.js';

const router = Router();

const productManager = new Products();

// Login:
router.get('/', (req, res) => {
    res.render('login')
})
router.get('/faillogin', (req, res) => {
    res.render('faillogin')
})

// Registro:
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/failregister', (req, res) => {
    res.render('failregister')
})

// GET products with paginate
router.get('/products', async (req, res) => {

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
})


// FileSystem:

/* import ProductManager from "../../dao/fileManagers/product_manager/product_manager.js"; */

/* const pm = new ProductManager('./src/products.json'); */

/* router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.render('home', {products})
}) */

export default router;