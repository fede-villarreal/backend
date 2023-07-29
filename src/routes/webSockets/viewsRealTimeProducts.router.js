import express from 'express';
import Products from '../../dao/dbManagers/product_manager.js';

const router = express.Router();
const pm = new Products();

router.get('/', async (req, res) => {
    const products = await pm.getAll()
    res.render('realTimeProducts', {products})
})

export default router;