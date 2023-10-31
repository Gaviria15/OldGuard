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
const elementos2 = document.getElementById('lista-2')
const elementos3 = document.getElementById('lista-3')
const lista = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

cargarEventlistener()
function cargarEventlistener() {
    elementos1.addEventListener('click', comprarElemento)
    elementos2.addEventListener('click', comprarElemento)
    elementos3.addEventListener('click', comprarElemento)
    carrito.addEventListener('click', eliminarElemento)
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
        price: elementos.querySelector('.price').textContent,
        id: elementos.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoElementos) 
}

function insertarCarrito(elementos) {
    const row = document.createElement('tr')
    row.innerHTML = `
    <td><img src="${elementos.Image}" width=100></td>
    <td>${elementos.titulo}</td>
    <td>${elementos.price}</td>
    <td><a href="#" class="borrar" data-id="${elementos.id}">X</a></td>`

    lista.appendChild(row)
}
function eliminarElemento(e) {
    e.preventDefault()
    let elementos,
    elementosId

    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove()
        elementos = e.target.parentElement.parentElement
        elementosId = elementos.querySelector('a').getAttribute('data-id')
    }
    
}

function vaciarCarrito(){
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild)
        
    }
    return false
}