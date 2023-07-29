import { Router } from "express";
import Products from "../../dao/dbManagers/product_manager.js";
import { ObjectId } from "mongodb";

const router = Router()
const productManager = new Products();

// GET products
router.get('/', async (req, res) => {

    const products = await productManager.getAll();
    if (!products) return res.send({status: 'error', error: "No se encontraron productos"})

    res.send({ status: 'success', payload: products })
})

// GET product by ID
router.get('/:pid', async (req, res) => {
    let { pid } = req.params
    if ( pid.length !== 24 ) return res.send({status: 'error', error: "El id del producto es incorrecto"})

    const product = await productManager.getProduct(pid)
    if (!product) return res.send({status: 'error', error: "Producto no encontrado"})

    res.send({status: 'success', payload: product})
})

// POST product
router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, status, thumbnails } = req.body;
    let newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        status,
        thumbnails
    }

    if (!title || !description || !code || !price || !stock || !category) return res.send({status: 'error', error: "Los campos title, description, code, price, stock y category son obligatorios"})

    const result = await productManager.saveProducts(newProduct)
    if (!result) return res.send({status: 'error', error: "No se pudo crear el producto"})

    res.send({ status: 'success', payload: result })
})

// PUT product
router.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    if ( pid.length !== 24 ) return res.send({status: 'error', error: "El id del producto es incorrecto"})

    let fieldsToUpdate = req.body;

    const products = await productManager.getAll()
    const productIndex = await products.findIndex(p => String(p._id) === pid)

    let update = { ...products[productIndex], ...fieldsToUpdate}

    let result = await productManager.updateProduct(pid, update)
    if (!result) return res.send({status: 'error', error: "No se pudo actualizar el producto"})

    res.send({status: 'success', payload: result})
})

// DELETE product
router.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    if ( pid.length !== 24 ) return res.send({status: 'error', error: "El id del producto es incorrecto"})

    const product = await productManager.getProduct(pid)
    if (!product) return res.send({status: 'error', error: "Producto no encontrado"})

    let result = await productManager.deleteProduct(pid)
    if (!result) return res.send({status: 'error', error: "No se pudo eliminar el producto"})

    res.send({status: 'success', payload: result})
})

export default router;