import express from 'express';
import { uploader } from "../utils.js";
import ProductManager from "../product_manager/product_manager.js";

const router = express.Router();
const pm = new ProductManager('./src/products.json');

router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.render('realTimeProducts', {products})
})

export default router;