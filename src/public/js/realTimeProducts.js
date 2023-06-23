const socket = io();

const formAddProduct = document.getElementById('form-addProducts')
const productsContainer = document.getElementById('productsContainer')

formAddProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const dataForm = new FormData(formAddProduct);
    const newProduct = {}
    dataForm.forEach((valor, clave) => newProduct[clave] = valor)
    socket.emit('addProduct', newProduct)
})

socket.on('newProducts', (newProducts) => {
    productsContainer.innerHTML = "";
    newProducts.map( p => {
        productsContainer.innerHTML+= `
            <div>
                <p>Product id: ${p.id}</p>
                <p>Name: ${p.title}</p>
                <p>Description: ${p.description}</p>
            </div>
        `
    })
})