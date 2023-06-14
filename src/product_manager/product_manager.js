import fs from "fs";

export default class ProductManager {

    constructor(rutaArchivo) {
        this.path = rutaArchivo
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const datos = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(datos)
            return products
        } else {
            return []
        }
    }

    addProduct = async ({
        title,
        description,
        code,
        price,
        stock,
        category,
        status = true,
        thumbnails = []
    }) => {

        if (!(title && description && code && price && stock && category)) {
            console.log(`Los campos: title, description, code, price, stock y category son obligatorios. Por favor completelos`)
            return
        }


        const products = await this.getProducts()

        const evaluarCode = await products.findIndex(p => p.code === code)
        if (evaluarCode !== -1) {
            console.log(`El campo code: ${code} ya existe. Por favor elija otro`)
            return
        }

        const product = {
            title,
            description,
            code,
            price,
            stock,
            category,
            status,
            thumbnails
        }

        if (products.length === 0) {
            product.id = 1
        } else {
            product.id = products[products.length - 1].id + 1
        }

        products.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))

        return product
    }

    getProductById = async (idProduct) => {
        const products = await this.getProducts()
        const productIndex = await products.findIndex(p => p.id === idProduct)
        if (productIndex === -1) {
            console.error(`Product: not found`)
        } else {
            return products[productIndex]
        }
    }

    updateProduct = async (idProduct, campoActualizado) => {

        const products = await this.getProducts()

        const productIndex = await products.findIndex(p => p.id === idProduct)

        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...campoActualizado }
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return products[productIndex]
        } else {
            console.error(`Product: not found`)
        }
    }

    deleteProduct = async (idProduct) => {

        const products = await this.getProducts()

        const productIndex = await products.findIndex(p => p.id === idProduct)

        if (productIndex !== -1) {
            products.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return products
        } else {
            console.error(`Product: not found`)
        }
    }
}


// TESTING

// 1- Crear instancia de ProductManager
/* const instanciaProductManager = new ProductManager("./src/products.json") */

// 2- getProducts
/* const getProducts = async () => {
    let obtenerProductos = await instanciaProductManager.getProducts()
    console.log(obtenerProductos)
}
await getProducts() */

// 3- Añadir producto
/* const addProduct = async (product) => {
    let añadirProducto = await instanciaProductManager.addProduct(product)
    console.log(añadirProducto)
}
await addProduct({
    title: "producto prueba 1",
    description: "este es un producto de prueba",
    price: 200,
    thumbnails: "sin imagen",
    code: "abc1",
    stock: 25
}) */

// 4- Segundo llamado getProducts
/* await getProducts() */

// 5- getProductById
/* const getProductById = async (idProduct) => {
    let obtenerProductoPorId = await instanciaProductManager.getProductById(idProduct)
    console.log(obtenerProductoPorId)
}
await getProductById(1) */

// 6- updateProduct
/* const updateProduct = async (idProduct, campoActualizado) => {
    let actualizarProducto = await instanciaProductManager.updateProduct(idProduct, campoActualizado)
    console.log(actualizarProducto)
}
await updateProduct(1, {title: "Producto Actualizado"}) */

// 7- deleteProduct
/* const deleteProduct = async ( idProduct ) => {
    let borrarProducto = await instanciaProductManager.deleteProduct(idProduct)
    console.log(borrarProducto)
}
await deleteProduct(2) */