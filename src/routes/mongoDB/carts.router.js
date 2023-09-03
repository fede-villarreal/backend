import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";

const router = Router()

// Obtener carrito por ID
router.get('/:cid', CartController.getCartById)

// Crear carrito
router.post('/', CartController.createCart)

// Añadir producto al carrito
router.post('/:cid/product/:pid', CartController.addProductToCart)

// Borrar producto del carrito
router.delete('/:cid/products/:pid', CartController.deleteProductToCart)

// Añadir multiples productos al carrito
router.put('/:cid', CartController.addMultipleProductsToCart)

// Actualizar cantidad de un producto del carrito
router.put('/:cid/products/:pid', CartController.updateProductQuantity)

// Vaciar carrito
router.delete('/:cid', CartController.emptyCart)

export default router;