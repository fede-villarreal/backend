import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import homeRouter from './routes/viewsHome.router.js';
import { Server } from 'socket.io';
import realTimeProductsRouter from './routes/viewsRealTimeProducts.router.js';
import ProductManager from './product_manager/product_manager.js';

const app = express();
const pm = new ProductManager('./src/products.json')

// Configuración Servidor
const httpserver = app.listen(8080, () => console.log('Servidor arriba'))
const socketServer = new Server(httpserver)

// Mejorar el manejo de datos complejos en las querys
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Configuración plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'))
app.use('/', homeRouter)
app.use('/realtimeproducts', realTimeProductsRouter)

// Escuchar la conexión
socketServer.on('connection', socket => {
    console.log('Inicio la comunicación')
    socket.on('addProduct', async (newProduct) => {
        await pm.addProduct(newProduct)
        const newProducts = await pm.getProducts()
        socket.emit('newProducts', newProducts)
    })
})