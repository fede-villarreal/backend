import { Router } from "express";
import Carts from "../../dao/dbManagers/cart_manager.js";
import Products from "../../dao/dbManagers/product_manager.js";

const router = Router()
const cartManager = new Carts();
const productManager = new Products();

// GET cart by ID
router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    if ( cid.length !== 24 ) return res.send({status: 'error', error: "El id del carrito es incorrecto"})

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({status: 'error', error: "Carrito no encontrado"})

    res.send({status: 'success', payload: cart})
})

// POST cart
router.post('/', async (req, res) => {
    let { products } = req.body;

    const result = await cartManager.addCart(products)
    if (!result) return res.send({status: 'error', error: "No se pudo crear el carrito"})

    res.send({ status: 'success', payload: result })
})

// POST product to cart
router.post('/:cid/product/:pid', async (req, res) => {
    let { cid, pid } = req.params;
    if ( cid.length !== 24 ) return res.send({status: 'error', error: "El id del carrito es incorrecto"})
    if ( pid.length !== 24 ) return res.send({status: 'error', error: "El id del producto es incorrecto"})

    const product = await productManager.getProduct(pid)
    if (!product) return res.send({status: 'error', error: "Producto no encontrado"})

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({status: 'error', error: "Carrito no encontrado"})

    let result = await cartManager.addProductToCart(cid, pid)
    if (!result) return res.send({status: 'error', error: "No se agregar el producto al carrito"})

    res.send({status: 'success', payload: result})
})

export default router;