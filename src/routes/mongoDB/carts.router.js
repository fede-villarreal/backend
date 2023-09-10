import { Router } from "express";
import { isAuth } from '../../config/passport.config.js';
import { userAuth } from '../../middleware/profile.middleware.js';
import CartController from "../../controllers/cart.controller.js";

const router = Router()

// Obtener carrito por ID
router.get('/:cid', isAuth, CartController.getCartById)

// Crear carrito reservado para cuando se registra un usuario

// Añadir producto al carrito
router.post('/:cid/product/:pid', isAuth, userAuth, CartController.addProductToCart)

// Borrar producto del carrito
router.delete('/:cid/products/:pid', isAuth, userAuth, CartController.deleteProductToCart)

// Añadir multiples productos al carrito
router.put('/:cid', isAuth, userAuth, CartController.addMultipleProductsToCart)

// Actualizar cantidad de un producto del carrito
router.put('/:cid/products/:pid', isAuth, userAuth, CartController.updateProductQuantity)

// Vaciar carrito
router.delete('/:cid', isAuth, userAuth, CartController.emptyCart)

// Finalizar compra
router.post('/:cid/purchase', isAuth, userAuth, CartController.purchase)

export default router;