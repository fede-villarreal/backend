const socket = io();

const formAddProduct = document.getElementById('form-addProducts')
const productsContainer = document.getElementById('productsContainer')

// Delete product desde button "delete"
const deleteProduct = () => {
    const buttonDeleteProduct = document.querySelectorAll('.button__deleteProduct')
    buttonDeleteProduct.forEach((button) => {
        button.addEventListener('click', () => {
            const idProduct = button.id.slice(16)
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    socket.emit('deleteProduct', idProduct)
                }
            })
        })
    })
}
deleteProduct()
socket.on('newProductsAfterDelete', (newProductsAfterDelete) => {
    productsContainer.innerHTML = `<h2>Total de productos: ${newProductsAfterDelete.length}</h2>`;
    newProductsAfterDelete.map(p => {
        productsContainer.innerHTML += `
            <h3>Producto:</h3>
            <div>
                <p>Product id: ${p._id}</p>
                <p>Name: ${p.title}</p>
                <p>Description: ${p.description}</p>
                <button id="button__delete--${p._id}" class="button__deleteProduct">Delete</button>
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
    productsContainer.innerHTML = `<h2>Total de productos: ${newProductsAfterAdd.length}</h2>`;
    newProductsAfterAdd.map(p => {
        productsContainer.innerHTML += `
            <div>
                <p>Product id: ${p._id}</p>
                <p>Name: ${p.title}</p>
                <p>Description: ${p.description}</p>
                <button id="button__delete--${p._id}" class="button__deleteProduct">Delete</button>
            </div>
        `
    })
    deleteProduct()
})