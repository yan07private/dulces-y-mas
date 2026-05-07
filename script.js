// aqui guardamos los productos que el usuario agregue al carrito
let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    //agrega el producto a la lista//
    carrito.push({ nombre, precio });
    total += precio;
    //actualiza lo que se ve en pantalla//
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totaltexto = document.getElementById("total");
    const btnPagar = document.getElementById("btn-pagar");
    //limpia la lista para actualizarla//
    lista.innerHTML = "";
    //agrega cada producto a la lista//
    carrito.forEach(function(producto, indice) {
        const item = document.createElement("li");
        item.textContent = producto.nombre + " - $" + producto.precio;
        //agrega un boton para eliminar el producto del carrito//
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "🤷❌";
        btnEliminar.onclick = function() {
            eliminardelCarrito(indice);
    };
        item.appendChild(btnEliminar);
        lista.appendChild(item);
    });

    //actualiza el total//
    totaltexto.textContent = "Total a pagar: $" + total;
    //habilita o deshabilita el boton de pagar dependiendo si hay productos en el carrito//
    if (carrito.length > 0) {
        btnPagar.style.display = "block";
    } else {
        btnPagar.style.display = "none";
    }
}
//funcion para eliminar un producto del carrito//
function eliminardelCarrito(indice) {
    total -= carrito[indice].precio;
    carrito.splice(indice, 1);
    actualizarCarrito();
}
//funcion para vaciar el carrito//
function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function pagar() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
        return;
    }
    // construye el rsumen de la compra//
    let mensaje = "Nuevo pedido - Dulces y Mas:\n\n";
    mensaje += "Productos:\n";
    carrito.forEach(function(producto) {
        mensaje += "- " + producto.nombre + " - $" + producto.precio + "\n";
    });
    mensaje += "\n *Total a pagar: $" + total + "*";
    mensaje += "\n\nPor favor, confirma tu pedido y direccion de entrega.";
    mensaje += "\n\n¡Gracias por tu compra!";
    // codifica el mensaje para usarlo en la URL de WhatsApp//
    const mensajeCodificado = encodeURIComponent(mensaje);
    // abre whasapp con tu numero y el resumen del pedido//
    window.open(
        "https://wa.me/593989489055?text=" + mensajeCodificado,"_blank"
    )
    //muestra confirmacion y vacia carrito//
    alert("¡Tu pedido ha sido enviado! Nos pondremos en contacto contigo pronto.");
    vaciarCarrito();
}
function cambiarModo() {
    const body = document.body;
    const btn = document.getElementById("btn-modo");
    
    body.classList.toggle("oscuro");
    if (body.classList.contains("oscuro")) {
        btn.textContent = "☀️";
    } else {
        btn.textContent = "🌙";
    }
}
// guardamos las calificaciones en un objeto para cada producto
let calificaciones = {};
 function cargarCalificaciones() {
    const guardadas = localStorage.getItem("calificaciones");
    if (guardadas) {
        calificaciones = JSON.parse(guardadas);
        // actualizamos las estrellas en pantalla con las calificaciones guardadas
        for (let producto in calificaciones) {
            mostrarEstrellas(producto, calificaciones[producto].promedio);
            const nota = document.getElementById("nota-" + producto);
            if (nota) {
                nota.textContent = "⭐ Promedio: " + calificaciones[producto].promedio.toFixed(1) + " (" + calificaciones[producto].votos + " votos)";
            
            }
        }
    }
}

function calificar(producto, estrellas) {
    if (!calificaciones[producto]) {
        const totalanterior = calificaciones[producto].promedio * calificaciones[producto].votos;
        calificaciones[producto].votos += 1;
        calificaciones[producto].promedio = (totalanterior + estrellas) / calificaciones[producto].votos;
    } else {
        calificaciones[producto] = { promedio: estrellas, votos: 1 };
    }
    // guardamos las calificaciones en el almacenamiento local
    localStorage.setItem("calificaciones", JSON.stringify(calificaciones));
}
// muestra estrellas actualizadas en pantalla
mostrarEstrellas(producto, calificaciones[producto].promedio);
// muestra el promedio y votos//
const nota = document.getElementById("nota-" + producto);
nota.textContent = "⭐ Promedio: " + calificaciones[producto].promedio.toFixed(1) + " (" + calificaciones[producto].votos + " votos)";
function mostrarEstrellas(producto, promedio) {
    const contenedor = document.querySelector('.estrellas[data-producto="${producto}"]');
    if (contenedor) {
        const spans = contenedor.querySelectorAll('span');
        spans.forEach(function(estrella, index) {
            if (index < Math.round(promedio)) {
                estrella.classList.add("activa");
            } else {
                estrella.classList.remove("activa");
            }
        });
    }
}
// cargamos las calificaciones guardadas al cargar la página
window.onload = cargarCalificaciones;

// Carrusel
let slideActual = 0;
const slides = document.querySelectorAll(".slide");
const puntos = document.querySelectorAll(".punto");

function mostrarSlide(n) {
  slides.forEach(s => s.classList.remove("activo"));
  puntos.forEach(p => p.classList.remove("activo"));

  slideActual = (n + slides.length) % slides.length;

  slides[slideActual].classList.add("activo");
  puntos[slideActual].classList.add("activo");
}

function cambiarSlide(direccion) {
  mostrarSlide(slideActual + direccion);
}

function irASlide(n) {
  mostrarSlide(n);
}

// Cambia automáticamente cada 4 segundos
setInterval(function() {
  cambiarSlide(1);
}, 4000);