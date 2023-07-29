import express from 'express';
/* import productsRouter from './routes/fileSystem/products.router.js'; */
/* import cartsRouter from './routes/fileSystem/carts.router.js'; */
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import homeRouter from './routes/webSockets/viewsHome.router.js';
import { Server } from 'socket.io';
import realTimeProductsRouter from './routes/webSockets/viewsRealTimeProducts.router.js';
/* import ProductManager from './dao/fileManagers/product_manager/product_manager.js'; */
import mongoose from 'mongoose';
import productsRouter from './routes/mongoDB/products.router.js';
import Products from './dao/dbManagers/product_manager.js';
import cartsRouter from './routes/mongoDB/carts.router.js';
// Libreria para ocultar datos sensibles
import "dotenv/config";

const app = express();
const PORT = 8080;

// FileSystem
/* const pm = new ProductManager('./src/products.json') */

// MongoDB
const pm = new Products();

// Conectar con DB
const environment = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.DB_NAME}.cbynjdo.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority`)
}
environment();

// Configuración Servidor
const httpserver = app.listen(PORT, () => console.log('Servidor arriba'))
const socketServer = new Server(httpserver)

// Mejorar el manejo de datos complejos en las querys
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Configuración plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))
app.use('/', homeRouter)
app.use('/realtimeproducts', realTimeProductsRouter)

// Escuchar la conexión
socketServer.on('connection', socket => {
    console.log('Inicio la comunicación')

    // Agregar producto
    socket.on('addProduct', async (newProduct) => {

        // FileSystem
        /* await pm.addProduct(newProduct) */
        /* const newProductsAfterAdd = await pm.getProducts() */

        // Mongo DB
        await pm.saveProducts(newProduct)
        const newProductsAfterAdd = await pm.getAll()

        socket.emit('newProductsAfterAdd', newProductsAfterAdd)
    })

    // Borrar producto
    socket.on('deleteProduct', async (idProduct) => {

        // FileSystem
        /* await pm.deleteProduct(idProduct) */
        /* const newProductsAfterDelete = await pm.getProducts() */

        // Mongo DB
        await pm.deleteProduct(idProduct)
        const newProductsAfterDelete = await pm.getAll()

        socket.emit('newProductsAfterDelete', newProductsAfterDelete)
    })
})