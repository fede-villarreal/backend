import express from 'express';
import ProductManager from "../product_manager/product_manager.js";

const router = express.Router();
const pm = new ProductManager('./src/products.json');

router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.render('home', {products})
})

export default router;