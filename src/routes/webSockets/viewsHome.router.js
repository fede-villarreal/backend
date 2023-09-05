import { Router } from 'express';
import { isAuth } from '../../config/passport.config.js'
import ViewsController from '../../controllers/views.controller.js';

const router = Router();

// Login:
router.get('/', ViewsController.login)
router.get('/faillogin', ViewsController.faillogin)

// Registro:
router.get('/register', ViewsController.register)
router.get('/failregister', ViewsController.failRegister)

// GET products with paginate
router.get('/products', isAuth, ViewsController.getProducts)

// Mostrar usuario
router.get('/current', isAuth, ViewsController.current)


// FileSystem:

/* import ProductManager from "../../dao/fileManagers/product_manager/product_manager.js"; */

/* const pm = new ProductManager('./src/products.json'); */

/* router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.render('home', {products})
}) */

export default router;