import { Router } from 'express';
import cartRouter from './mongoDB/carts.router.js';
import productRouter from './mongoDB/products.router.js';
import sessionRouter from './mongoDB/sessions.router.js';
import loggerRouter from './mongoDB/logger.router.js';

const router = Router();

router.use('/carts', cartRouter)
router.use('/products', productRouter)
router.use('/sessions', sessionRouter)

// Logger:
router.use('/loggerTest', loggerRouter) // Modificar entorno desde 'src/middleware/logger.middleware.js'

export default router;