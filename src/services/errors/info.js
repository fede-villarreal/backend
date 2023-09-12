// ID ERROR:

export const validateIdErrorInfo = (id) => {
    return `El id debe tener 24 dígitos:
            Id recibido: ${id},
            Tamaño del id: ${id.length} dígitos`
}


// CART ERRORS:

export const getCartErrorInfo = (cid) => {
    return `Carrito no encontrado:
            Id recibido: ${cid}`
}

export const addProductToCartErrorInfo = (cid, pid) => {
    return `No se pudo agregar el producto al carrito:
            Id del carrito: ${cid},
            Id del product: ${pid}`
}

export const deleteProductToCartErrorInfo = (cid, pid) => {
    return `No se pudo borrar el producto del carrito:
            Id del carrito: ${cid},
            Id del product: ${pid}`
}

export const addMultipleProductsToCartErrorInfo = (cid, products) => {
    return `No se pudo actualizar la lista de productos del carrito:
            Id del carrito: ${cid},
            Lista de productos: ${products}`
}

export const updateProductQuantityErrorInfo = (cid, pid, productQuantity) => {
    return `No se pudo actualizar la cantidad del producto en el carrito:
            Id del carrito: ${cid},
            Id del product: ${pid},
            Cantidad actualizada del producto: ${productQuantity}`
}

export const emptyCartErrorInfo = (cid) => {
    return `No se pudo vaciar el carrito:
            Id del carrito: ${cid}`
}

export const purchaseErrorInfo = () => {
    return `No se pudo procesar la compra`
}


// PRODUCTS ERRORS:

export const getProductsErrorInfo = () => {
    return `No se encontraron productos`
}

export const getProductByIdErrorInfo = (pid) => {
    return `Producto no encontrado:
            Id recibido: ${pid}`
}

export const createProductErrorInfo = (product) => {
    return `No se pudo crear el producto:
            Datos recibidos: ${product}`
}

export const requiredFieldsToCreateProductErrorInfo = (title, description, code, price, stock, category) => {
    return `Los siguientes campos son obligatorios:
            title: (String), recibido: ${title},
            description: (String), recibido: ${description},
            code: (String), debe ser único, recibido: ${code},
            price: (Number), recibido: ${price},
            stock: (Number), recibido: ${stock},
            category: (String), recibido: ${category}`
}

export const updateProductErrorInfo = (pid, fieldsToUpdate) => {
    return `No se pudo actualizar el producto:
            Id producto: ${pid},
            Campos a actualizar: ${fieldsToUpdate}`
}

export const deleteProductErrorInfo = (pid) => {
    return `No se pudo eliminar el producto:
            Id del producto: ${pid}`
}


// SESSION ERRORS:

export const registerErrorInfo = () => {
    return `Error al registrar al usuario`
}

export const loginErrorInfo = () => {
    return `Error al loguear al usuario`
}

export const githubErrorInfo = () => {
    return `Error al autenticar con github`
}

export const unauthorizedUserErrorInfo = () => {
    return `Debe loguearse para poder realizar esta acción`
}

export const unauthorizedRoleErrorInfo = () => {
    return `Su perfil no dispone de los permisos necesarios para realizar esta acción`
}