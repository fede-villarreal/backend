import express from 'express';
import ProductManager from './product_manager/product_manager.js';

const app = express();

// Crear instancia de ProductManager
const productManager = new ProductManager('./src/products.json')

// Obtener productos
const getProducts = async () => {
    let obtenerProductos = await productManager.getProducts()
    return obtenerProductos
}

// Mejorar el manejo de datos complejos en las querys
app.use(express.urlencoded({extended:true}))

// Endpoint products
app.get('/products', async (req, res) => {
    const products = await getProducts()
    let limit = req.query.limit
    if (!limit) return res.send({products})
    let productsLimit = products.slice(0, limit)
    res.send({productsLimit})
})

// Endpoint product por ID
app.get('/products/:pid', async (req, res) => {
    const products = await getProducts()
    let productId = Number(req.params.pid)
    let product = products.find( p => p.id === productId )
    if (!product) return res.send({error: "Producto no encontrado"})
    res.send(product)
})

// Levantar servidor
app.listen(8080, () => console.log("Servidor arriba"))