import { Router } from "express";
import { isAuth } from '../../config/passport.config.js';
import { adminAuth } from '../../middleware/profile.middleware.js';
import ProductController from '../../controllers/product.controller.js'

const router = Router()

// Obtener productos
router.get('/', ProductController.getProducts)

// Productos de prueba (Mocks)
router.get('/mockingproducts', ProductController.mockingProducts)

// Obtener producto por Id
router.get('/:pid', ProductController.getProductById)

// Crear producto
router.post('/', isAuth, adminAuth, ProductController.createProduct)

// Actualizar producto
router.put('/:pid', isAuth, adminAuth, ProductController.updateProduct)

// Borrar producto
router.delete('/:pid', isAuth, adminAuth, ProductController.deleteProduct)

export default router;