import { Router } from "express";
import CartManager from "../../dao/fileManagers/cart_manager/cart_manager.js";
import ProductManager from "../../dao/fileManagers/product_manager/product_manager.js";

const router = Router();
const cm = new CartManager('./src/carts.json')
const pm = new ProductManager('./src/products.json')

// POST cart
router.post('/', async (req, res) => {
    const addCart = async () => {
        let agregarCarrito = await cm.addCart()
        if (!agregarCarrito) {
            res.status(400).send({status: 'error', error: 'No se creo el carrito'})
        } else {
            res.send({status: 'Success', message: 'Carrito creado'})
        }
    }
    await addCart()
} )

// GET cart by ID
router.get('/:cid', async (req, res) => {
    const cart = await cm.getCartById(Number(req.params.cid))
    if (!cart) return res.send({error: "Carrito no encontrado"})
    res.send(cart)
})

// POST product to cart
router.post('/:cid/product/:pid', async (req, res) => {
    const product = await pm.getProductById(Number(req.params.pid))
    if (!product) return res.send({error: "Producto no encontrado"})
    const idProduct = product.id;

    const cart = await cm.getCartById(Number(req.params.cid))
    if (!cart) return res.send({error: "Carrito no encontrado"})
    const idCart = cart.id;

    const addProductToCart = async (idCart, idProduct) => {
        let agregarProductoAlCarrito = await cm.addProductToCart(idCart, idProduct)
        if (!agregarProductoAlCarrito) {
            res.status(400).send({status: 'error', error: 'No se pudo agregar el producto al carrito'})
        } else {
            res.send({status: 'Success', message: 'Producto agregado al carrito'})
        }
    }
    await addProductToCart(idCart, idProduct)
})

export default router;