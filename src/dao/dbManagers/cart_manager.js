import cartModel from "../models/carts.js";

export default class Carts {
    /* constructor(){
        console.log('Trabajando con DB')
    }
 */
    getCart = async (cid) => {
        let cart = await cartModel.findOne({_id: cid})
        return cart
    }

    addCart = async (products) => {
        let result = await cartModel.create(products)
        return result
    }

    addProductToCart = async (cid, pid ) => {
        let cart = await cartModel.findOne({_id: cid})

        const productIndex = cart.products.findIndex(p => String(p.product) === pid)
        if( productIndex === -1) {
            cart.products.push({product: pid})
        } else {
            cart.products[productIndex].quantity++
        }

        let result = await cartModel.updateOne({_id: cid}, cart)
        return result
    }

}