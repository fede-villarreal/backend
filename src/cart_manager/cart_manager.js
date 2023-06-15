import fs from 'fs';

export default class CartManager {

    constructor(rutaArchivo) {
        this.path = rutaArchivo;
    }

    #getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const datos = await fs.promises.readFile(this.path, "utf-8")
            const carts = JSON.parse(datos)
            return carts
        } else {
            return []
        }
    }

    getCartById = async (idCart) => {
        const carts = await this.#getCarts()
        const cartIndex = carts.findIndex(c => c.id === idCart)
        if (cartIndex === -1) return console.log(`Cart: not found`)
        return carts[cartIndex]
    }

    addCart = async () => {
        const carts = await this.#getCarts()
        let cart = {
            id: 0,
            products: []
        }
        if(carts.length === 0) {
            cart.id = 1
        } else {
            cart.id = carts[carts.length - 1].id + 1
        }
        carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
        return cart
    }

    addProductToCart = async (idCart, idProduct) => {
        const carts = await this.#getCarts()
        const cartIndex = carts.findIndex( c => c.id === idCart)
        if(cartIndex === -1) return

        const product = {
            product: idProduct,
            quantity: 1
        }

        const productIndex = carts[cartIndex].products.findIndex(p => p.product === idProduct)
        if (productIndex === -1) {
            carts[cartIndex].products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
        } else {
            carts[cartIndex].products[productIndex].quantity++
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
        }

        return carts[cartIndex]
    }

}