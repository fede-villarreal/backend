import { Router } from "express";
import { uploader } from "../../utils.js";
import ProductManager from "../../dao/fileManagers/product_manager/product_manager.js";

const router = Router();
const pm = new ProductManager('./src/products.json')

// GET products
router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    let limit = req.query.limit
    if (!limit) return res.send({products})
    let productsLimit = products.slice(0, limit)
    res.send({productsLimit})
})

// GET product by ID
router.get('/:pid', async (req, res) => {
    const product = await pm.getProductById(Number(req.params.pid))
    if (!product) return res.send({error: "Producto no encontrado"})
    res.send(product)
})

// POST product
router.post('/', uploader.single('file'), async (req, res) => {
    if(!req.file) return res.status(400).send({status: 'error', error: 'La imagen es requerida para crear el producto'})
    let product = req.body
    console.log(product)
    product.detail = req.file.path
    const addProduct = async (product) => {
        let agregarProducto = await pm.addProduct(product)
        if (!agregarProducto) {
            res.status(400).send({status: 'error', error: 'No se agrego el producto'})
        } else {
            res.send({status: 'Success', message: 'Producto creado'})
        }
    }
    await addProduct(product)
})


// PUT product
router.put('/:pid', async (req, res) => {
    let productId = Number(req.params.pid)
    let productUpdate = req.body;
    const updateProduct = async (productId, productUpdate) => {
        let actualizarProducto = await pm.updateProduct(productId, productUpdate)
        if(!actualizarProducto) {
            res.status(400).send({status: 'error', error: 'La información no coincide'})
        } else {
            res.send({status: 'success', message: 'Producto actualizado'})
        }
    }
    await updateProduct(productId, productUpdate)
})

// DELETE product
router.delete('/:pid', async (req, res) => {
    let productId = Number(req.params.pid)
    const deleteProduct = async (productId) => {
        let borrarProducto = await pm.deleteProduct(productId)
        if(!borrarProducto) {
            res.status(400).send({status: 'error', error: 'Producto no encontrado. El producto no pudo ser borrado'})
        } else {
            res.send({status: 'success', message: 'Producto borrado'})
        }
    }
    await deleteProduct(productId)
})

export default router;