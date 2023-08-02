import { Router } from "express";
import Carts from "../../dao/dbManagers/cart_manager.js";
import Products from "../../dao/dbManagers/product_manager.js";

const router = Router()
const cartManager = new Carts();
const productManager = new Products();

// GET cart by ID
router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({ status: 'error', error: "Carrito no encontrado" })

    res.send({ status: 'success', payload: cart })
})

// POST cart
router.post('/', async (req, res) => {
    let { products } = req.body;

    const result = await cartManager.addCart(products)
    if (!result) return res.send({ status: 'error', error: "No se pudo crear el carrito" })

    res.send({ status: 'success', payload: result })
})

// POST product to cart
router.post('/:cid/product/:pid', async (req, res) => {
    let { cid, pid } = req.params;
    if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })
    if (pid.length !== 24) return res.send({ status: 'error', error: "El id del producto debe tener 24 digitos" })

    const product = await productManager.getProduct(pid)
    if (!product) return res.send({ status: 'error', error: "Producto no encontrado" })

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({ status: 'error', error: "Carrito no encontrado" })

    let result = await cartManager.addProductToCart(cid, pid)
    if (!result) return res.send({ status: 'error', error: "No se agregar el producto al carrito" })

    res.send({ status: 'success', payload: result })
})

// DELETE product to cart
router.delete('/:cid/products/:pid', async (req, res) => {
    let { cid, pid } = req.params;
    if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })
    if (pid.length !== 24) return res.send({ status: 'error', error: "El id del producto debe tener 24 digitos" })

    const product = await productManager.getProduct(pid)
    if (!product) return res.send({ status: 'error', error: "Producto no encontrado" })

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({ status: 'error', error: "Carrito no encontrado" })

    let result = await cartManager.deleteProductToCart(cid, pid)
    if (!result) return res.send({ status: 'error', error: "No se borrar el producto del carrito" })

    res.send({ status: 'success', payload: result })
})

// PUT products to cart
router.put('/:cid', async (req, res) => {
    let { cid } = req.params;
    let products = req.body;

    if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({ status: 'error', error: "Carrito no encontrado" })

    let evaluation = true
    products.forEach(async p => {
        if (p.product.length !== 24) return evaluation = false
        let product = await productManager.getProduct(p.product)
        if (!product) return evaluation = false
    });
    if (!evaluation) return res.send({ status: 'error', error: "El id del producto es incorrecto" })

    let result = await cartManager.addMultipleProducts(cid, products)
    if (!result) return res.send({ status: 'error', error: "No se pudo actualizar la lista de productos del carrito" })

    res.send({ status: 'success', payload: result })
})

// PUT product's quantity
router.put('/:cid/products/:pid', async (req, res) => {
    let { cid, pid } = req.params;
    let productQuantity = req.body;

    if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })
    if (pid.length !== 24) return res.send({ status: 'error', error: "El id del producto debe tener 24 digitos" })

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({ status: 'error', error: 'No se pudo encontrar el carrito'})

    const product = await productManager.getProduct(pid)
    if (!product) return res.send({ status: 'error', error: "Producto no encontrado" })

    let result = await cartManager.updateQuantity(cid, pid, productQuantity)
    if (!result) return res.send({ status: 'error', error: "No se pudo actualizar la cantidad de productos en el carrito" })

    res.send({ status: 'success', payload: result })
})

// DELETE all products to cart
router.delete('/:cid', async (req, res) => {
    let { cid } = req.params;
    if (cid.length !== 24) return res.send({ status: 'error', error: "El id del carrito debe tener 24 digitos" })

    const cart = await cartManager.getCart(cid)
    if (!cart) return res.send({ status: 'error', error: 'No se pudo encontrar el carrito'})

    let result = await cartManager.emptyCart(cid)
    if (!result) return res.send({ status: 'error', error: "No se pudo vaciar el carrito" })

    res.send({ status: 'success', payload: result })
})

export default router;