var swiper = new Swiper(".mySwiper-1",{
    slidesPerView:1,
    spaceBetween:30,
    loop:true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEL:".swiper-button-prev",
    }
})
var swiper = new Swiper(".mySwiper-2",{
    slidesPerView:3,
    spaceBetween:20,
    loop:true,
    loopFillGroupWithBlank:true,
    navigation:{
        nextEl:".swiper-button-next",
        prevEL:".swiper-button-prev",
    },
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        520:{
            slidesPerView:2,
        }
    }
})
let tabInputs = document.querySelectorAll(".tabInput")
tabInputs.forEach(function(input) {
    input.addEventListener('change',function() {
        let id = input.ariaValueMax
        let thisSwiper = document.getElementById('swiper' + id)
        // thisSwiper.swiper.update()        
    })    
})

const carrito = document.getElementById('carrito')
const elementos1 = document.getElementById('lista-1')
const lista = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')
const productosEnCarrito = {}; // Objeto para llevar el seguimiento de la cantidad de cada producto


cargarEventlistener()
function cargarEventlistener() {
    elementos1.addEventListener('click', comprarElemento)
    carrito.addEventListener('click', eliminarElemento)
    carrito.addEventListener('click', añadirElemento)
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

}
function comprarElemento(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const elementos = e.target.parentElement.parentElement
        leerDatosElemento(elementos)
    }
    
}

function leerDatosElemento(elementos) {
    const infoElementos = {
        Image: elementos.querySelector('img').src,
        titulo: elementos.querySelector('h4').textContent,
        price: parseFloat(elementos.querySelector('.price').textContent.replace('$', '')),
        id: elementos.querySelector('a').getAttribute('data-id'),
    };

    if (productosEnCarrito.hasOwnProperty(infoElementos.id)) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productosEnCarrito[infoElementos.id].cantidad++;
        // Actualizar la cantidad en la lista
        document.querySelector(`[data-id="${infoElementos.id}"]`).parentElement.parentElement.querySelector('td:nth-child(3)').textContent = productosEnCarrito[infoElementos.id].cantidad;
    } else {
        // Si es un nuevo producto, agregarlo al objeto de seguimiento
        productosEnCarrito[infoElementos.id] = {
            cantidad: 1,
            info: infoElementos,
        };

        // Insertar el nuevo producto en el carrito
        insertarCarrito(infoElementos);
    }

    calcularTotalCarrito();
}

function insertarCarrito(elementos) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${elementos.Image}" width=90></td>
    <td>${elementos.price}</td>
    <td>${productosEnCarrito[elementos.id].cantidad}</td>
    <td><a href="#" class="añadir" data-id="${elementos.id}">+</a></td>
    <td><a href="#" class="borrar" data-id="${elementos.id}">–</a></td>`;

    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    let elementos, elementosId;

    if (e.target.classList.contains('borrar')) {
        elementos = e.target.parentElement.parentElement;
        elementosId = elementos.querySelector('a').getAttribute('data-id');

        // Disminuir la cantidad del producto en el seguimiento
        productosEnCarrito[elementosId].cantidad--;

        if (productosEnCarrito[elementosId].cantidad === 0) {
            // Si la cantidad llega a cero, eliminar el producto del seguimiento y de la lista
            
            delete productosEnCarrito[elementosId];
            
            elementos.remove();
        } else {
            // Si aún hay cantidad, actualizar la cantidad en la lista
            elementos.querySelector('td:nth-child(3)').textContent = productosEnCarrito[elementosId].cantidad;
        }

        calcularTotalCarrito();
    }
}

function añadirElemento(e) {
    e.preventDefault();
    let elementos, elementosId;

    if (e.target.classList.contains('añadir')) {
        elementos = e.target.parentElement.parentElement;
        elementosId = elementos.querySelector('a').getAttribute('data-id');

        // Asegurarse de que el producto esté en el carrito antes de intentar aumentar la cantidad
        if (productosEnCarrito.hasOwnProperty(elementosId)) {
            productosEnCarrito[elementosId].cantidad++;
            // Actualizar la cantidad en la lista
            elementos.querySelector('td:nth-child(3)').textContent = productosEnCarrito[elementosId].cantidad;
        } else {
            // Si el producto no está en el carrito, añádelo con cantidad 1
            productosEnCarrito[elementosId] = {
                cantidad: 1,
                info: {
                    Image: elementos.querySelector('img').src,
                    titulo: elementos.querySelector('h4').textContent,
                    price: parseFloat(elementos.querySelector('.price').textContent.replace('$', '')),
                }
            };
            insertarCarrito(productosEnCarrito[elementosId].info);
        }

        calcularTotalCarrito();
    }
}




function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    // Reiniciar el objeto de seguimiento
    Object.keys(productosEnCarrito).forEach(function (key) {
        delete productosEnCarrito[key];
    });

    calcularTotalCarrito();
    return false;
}

function calcularTotalCarrito() {
    let total = 0;
    let cantidad = 0;

    Object.values(productosEnCarrito).forEach(function (producto) {
        let precio = producto.info.price;
        const cantidadItem = producto.cantidad;

        total += precio * cantidadItem;
        cantidad += cantidadItem;
    });

    let mostrar = document.getElementById('total');

    if (cantidad > 0) {
        mostrar.style.display = 'block'
        mostrar.innerHTML = `Total: $${total}`;
    } else {
        mostrar.innerHTML = '';
        mostrar.style.display = 'none'
    }

}


const iconoUsuarios = document.getElementById('icono-usuarios');
const subMenuUsuarios = document.getElementById('sub-menu-usuarios');

iconoUsuarios.addEventListener('click', () => {
    if (subMenuUsuarios.style.display === 'block') {
        subMenuUsuarios.style.display = 'none';
    } else {
        subMenuUsuarios.style.display = 'block';
    }
});
document.getElementById('abrir-modal').addEventListener('click', abrirModal);
document.getElementById('cerrar-modal').addEventListener('click', cerrarModal);

function abrirModal() {
  document.getElementById('modal').style.display = 'block';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

function agregarProducto() {
  // Aquí puedes agregar lógica para manejar la adición de productos
  // Puedes acceder a los valores del formulario usando document.getElementById('nombre').value, etc.

  // Cerrar el modal después de agregar el producto
  cerrarModal();
}



