import { Router } from "express";
import ProductController from '../../controllers/product.controller.js'

const router = Router()

// Obtener productos
router.get('/', ProductController.getProducts)

// Obtener producto por Id
router.get('/:pid', ProductController.getProductById)

// Crear producto
router.post('/', ProductController.createProduct)

// Actualizar producto
router.put('/:pid', ProductController.updateProduct)

// Borrar producto
router.delete('/:pid', ProductController.deleteProduct)

export default router;