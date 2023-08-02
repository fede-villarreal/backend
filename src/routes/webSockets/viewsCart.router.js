import { Router } from "express";
import Carts from "../../dao/dbManagers/cart_manager.js";

const router = Router();

const cm = new Carts();

// GET cart
router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })

    const cart = await cm.getCart(cid)
    if (!cart) return res.send({ status: 'error', error: "Carrito no encontrado" })

    let products = cart.products.map(p => ({
        ...p.product.toObject(),
        quantity: p.quantity
    }))

    res.render('cart', {products})
})

export default router;