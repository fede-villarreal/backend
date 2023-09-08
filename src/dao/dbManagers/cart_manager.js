import cartModel from "../models/carts.js";
import productModel from "../models/products.js";

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

        const productIndex = await cart.products.findIndex(p => String(p.product._id) === pid)

        if( productIndex === -1) {
            cart.products.push({product: pid})
        } else {
            cart.products[productIndex].quantity++
        }

        let result = await cartModel.updateOne({_id: cid}, cart)
        return result
    }

    deleteProductToCart = async (cid, pid) => {
        let cart = await cartModel.findOne({_id: cid})

        cart.products = cart.products.filter(p => String(p.product._id) !== pid)

        let result = await cartModel.updateOne({_id: cid}, cart)
        return result
    }

    addMultipleProducts = async (cid, listOfProducts) => {
        let cart = await cartModel.findOne({_id: cid})

        const loopEvaluation = async () => {
            listOfProducts.forEach(async p => {
                let pid = p.product;
                let pQuantity = p.quantity;
                
                let productIndex = await cart.products.findIndex(p => String(p.product._id) === pid)
                if( productIndex === -1) {
                    cart.products.push({product: pid, quantity: pQuantity})
                } else {
                    cart.products[productIndex].quantity += p.quantity
                }
            });
        }
        await loopEvaluation()

        let result = await cartModel.updateOne({_id: cid}, cart)
        return result
    }

    updateQuantity = async (cid, pid, productQuantity) => {
        let cart = await cartModel.findOne({_id: cid})
        let pQuantity = productQuantity.quantity;

        const productIndex = await cart.products.findIndex(p => String(p.product._id) === pid)
        if( productIndex === -1) {
            cart.products.push({product: pid, quantity: pQuantity})
        } else {
            cart.products[productIndex].quantity += pQuantity
        }

        let result = await cartModel.updateOne({_id: cid}, cart)
        return result
    }

    emptyCart = async (cid) => {
        let cart = await cartModel.findOne({_id: cid})

        cart.products = [];

        let result = await cartModel.updateOne({_id: cid}, cart)
        return result
    }

    purchase = async (cid) => {
        let cart = await cartModel.findOne({_id: cid})

        const update = async () => {
            cart.products.forEach(async p => {
                let product = await productModel.findOne({_id: String(p.product._id)})
                let productQuantity = p.quantity;
    
                if (product.stock >= productQuantity) {
    
                    product.stock-= productQuantity
    
                    await productModel.updateOne({_id: product._id}, product)
    
                    cart.products = cart.products.filter(p => String(p.product._id) !== String(product._id))
                    
                    await cartModel.updateOne({_id: cid}, cart)
                }
            });
        }

        let result = async () => {
            await update()
            return await cartModel.updateOne({_id: cid}, cart)
        }
        return result();
    }
}