import { Router } from 'express';
import viewsCart from './webSockets/viewsCart.router.js';
import viewsHome from './webSockets/viewsHome.router.js';
import viewsRealTimeProducts from './webSockets/viewsRealTimeProducts.router.js';

const router = Router();

router.use('/', viewsHome)
router.use('/carts', viewsCart)
router.use('/realtimeproducts', viewsRealTimeProducts)

export default router;