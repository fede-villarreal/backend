import express from 'express';
import productsRouter from './routes/products.router.js'
/* import ProductManager from './product_manager/product_manager.js'; */

const app = express();

// Mejorar el manejo de datos complejos en las querys
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)

// Levantar servidor
app.listen(8080, () => console.log("Servidor arriba"))