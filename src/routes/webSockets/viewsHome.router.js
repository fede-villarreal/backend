import { Router } from 'express';
import Products from '../../dao/dbManagers/product_manager.js';

const router = Router();

const productManager = new Products();

router.get('/', async (req, res) => {
    let products = await productManager.getAll();
    res.render('home', {products})
})


// FileSystem:

/* import ProductManager from "../../dao/fileManagers/product_manager/product_manager.js"; */

/* const pm = new ProductManager('./src/products.json'); */

/* router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.render('home', {products})
}) */

export default router;