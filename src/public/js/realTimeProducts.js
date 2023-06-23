const socket = io();

const formAddProduct = document.getElementById('form-addProducts')
const productsContainer = document.getElementById('productsContainer')

// Delete product desde button "delete"
const deleteProduct = () => {
    const buttonDeleteProduct = document.querySelectorAll('.button__deleteProduct')
    buttonDeleteProduct.forEach((button) => {
        button.addEventListener('click', () => {
            const idProduct = Number(button.id.slice(16))
            socket.emit('deleteProduct', idProduct)
        })
    })
}
deleteProduct()
socket.on('newProductsAfterDelete', (newProductsAfterDelete) => {
    productsContainer.innerHTML = "";
    newProductsAfterDelete.map( p => {
        productsContainer.innerHTML+= `
            <div>
                <p>Product id: ${p.id}</p>
                <p>Name: ${p.title}</p>
                <p>Description: ${p.description}</p>
                <button id="button__delete--${p.id}" class="button__deleteProduct">Delete</button>
            </div>
        `
    })
    deleteProduct()
})

// Add product desde form
formAddProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const dataForm = new FormData(formAddProduct);
    const newProduct = {}
    dataForm.forEach((valor, clave) => newProduct[clave] = valor)
    socket.emit('addProduct', newProduct)
})
socket.on('newProductsAfterAdd', (newProductsAfterAdd) => {
    productsContainer.innerHTML = "";
    newProductsAfterAdd.map( p => {
        productsContainer.innerHTML+= `
            <div>
                <p>Product id: ${p.id}</p>
                <p>Name: ${p.title}</p>
                <p>Description: ${p.description}</p>
                <button id="button__delete--${p.id}" class="button__deleteProduct">Delete</button>
            </div>
        `
    })
    deleteProduct()
})