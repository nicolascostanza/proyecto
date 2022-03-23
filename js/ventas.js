// VARIABLES
let ventas = [];
let btnAgregar = document.getElementById("btnAgregar");
let btnEliminar = document.getElementById("botonEliminar");
let producto = document.getElementById("producto");
let cliente = document.getElementById("cliente");
let codigo = document.getElementById("codigo");
let cantidad = document.getElementById("cantidad");
let precio = document.getElementById("precio");
let descuento = document.getElementById("descuento");
let respuesta = Boolean;
// eventos
btnAgregar.addEventListener("click", AgregarVenta);
btnEliminar.addEventListener("click", Eliminar);
// CLASE
class Venta{
    constructor(producto, cliente, codigo, cantidad, precio, descuento) {
        this.producto = producto;
        this.cliente = cliente;
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.precio  = precio;
        this.descuento = descuento;
    }
}
// FUNCIONES DE TOAST 
function notificacionVerde(e){
    Toastify({
        text: e,
        duration: 3000,
        newWindow: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}
function notificacionRoja(e) {
    Toastify({
        text: e,
        duration: 3000,
        newWindow: true,
        backgroundColor: "linear-gradient(to right, #f04f67, #ff0000)",
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        onClick: function(){} 
    }).showToast();
}
// FUNCION BTN AGREGAR
function AgregarVenta(e) {
    e.preventDefault();
    respuesta = false;
    let localStorageActualizado = [];
    let productoNuevo = document.getElementById("productoNuevo").value;
    let clienteNuevo = document.getElementById("clienteNuevo").value;
    let codigoNuevo = document.getElementById("codigoNuevo").value;
    let cantidadNuevo = document.getElementById("cantidadNuevo").value;
    let precioNuevo = document.getElementById("precioNuevo").value;
    let descuentoNuevo = document.getElementById("descuentoNuevo").value;
    // verifico que los campos esten completos sino obligo a completarlos
    if ((productoNuevo !== "" && productoNuevo !== null) &&
    (clienteNuevo !== "" && clienteNuevo !== null) &&
    (codigoNuevo !== "" && codigoNuevo !== null) &&
    (cantidadNuevo !== "" && cantidadNuevo !== null) &&
    (precioNuevo !== "" && precioNuevo !== null) &&
    (descuentoNuevo !== "" && descuentoNuevo !== null)) {
        // traigo el localstorage actualizado para verificar que el codigo no este en uso
        localStorageActualizado = JSON.parse(localStorage.getItem("ventas"));
        localStorageActualizado.forEach(localStorageActualizado => {
            if(localStorageActualizado.codigo === codigoNuevo){
                respuesta = true;        
            }
        })
        if (respuesta){
            notificacionRoja("Codigo existente");
        }else{ 
            guardarDatos();
            imprimirDatosNuevos();
            notificacionVerde("venta registrada");
        }            
    }else{
        notificacionRoja("Complete todos los campos");
    }
    // le otorgo otro valor a respuesta para el proximo foreach de localStorageNuevo
    respuesta = false;
};
// SUBFUNCIONES DEL BTN AGREGAR
function guardarDatos() {
    let productoNuevo = document.getElementById("productoNuevo").value;
    let clienteNuevo = document.getElementById("clienteNuevo").value;
    let codigoNuevo = document.getElementById("codigoNuevo").value;
    let cantidadNuevo = document.getElementById("cantidadNuevo").value;
    let precioNuevo = document.getElementById("precioNuevo").value;
    let descuentoNuevo = document.getElementById("descuentoNuevo").value;
    const venta = new Venta (productoNuevo, clienteNuevo, codigoNuevo, cantidadNuevo, precioNuevo, descuentoNuevo);
    ventas.push(venta);
    // guardo en localstorage el nuevo producto cargado
    localStorage.setItem("ventas", JSON.stringify(ventas)); 
}
function imprimirDatosNuevos() {
    let agregar = [];
    agregar = ventas[ventas.length-1]; 
    // let costounitario = 0;
    // costounitario = ((agregar.costo)/(agregar.cantidad)).toFixed(2);
    let contenedorProducto = document.createElement("div");
    contenedorProducto.innerHTML = `<h2>${agregar.producto}</h2>`;
    let contenedorCliente = document.createElement("div");
    contenedorCliente.innerHTML = `<h2>${agregar.cliente}</h2>`;
    let contenedorCodigo = document.createElement("div");
    contenedorCodigo.innerHTML = `<h2>${agregar.codigo}</h2>`;
    let contenedorCantidad = document.createElement("div");
    contenedorCantidad.innerHTML = `<h2>${agregar.cantidad}</h2>`;
    let contenedorPrecio = document.createElement("div");
    contenedorPrecio.innerHTML = ` <h2>$${agregar.precio}</h2> `;
    let contenedorDescuento = document.createElement("div");
    contenedorDescuento.innerHTML = `<h2>$${agregar.descuento}</h2>`;
    // APPENDCHILD DE LOS CONTENEDORES CREADOS PARA EL CRUD
    producto.appendChild(contenedorProducto);
    cliente.appendChild(contenedorCliente);
    codigo.appendChild(contenedorCodigo);
    cantidad.appendChild(contenedorCantidad);
    precio.appendChild(contenedorPrecio);
    descuento.appendChild(contenedorDescuento);
}
function imprimirDatos() {
    ventas.forEach(e => {
        let contenedorProducto = document.createElement("div");
        contenedorProducto.innerHTML = `<h2>${e.producto}</h2>`;
        let contenedorCliente = document.createElement("div");
        contenedorCliente.innerHTML = `<h2>${e.cliente}</h2>`;
        let contenedorCodigo = document.createElement("div");
        contenedorCodigo.innerHTML = `<h2>${e.codigo}</h2>`;
        let contenedorCantidad = document.createElement("div");
        contenedorCantidad.innerHTML = `<h2>${e.cantidad}</h2>`;
        let contenedorPrecio = document.createElement("div");
        contenedorPrecio.innerHTML = ` <h2>$${e.precio}</h2> `;
        let contenedorDescuento = document.createElement("div");
        contenedorDescuento.innerHTML = ` <h2>$${e.descuento}</h2> `;
        // append childs de los contenedores creados
        producto.appendChild(contenedorProducto);
        cliente.appendChild(contenedorCliente);
        codigo.appendChild(contenedorCodigo);
        cantidad.appendChild(contenedorCantidad);
        precio.appendChild(contenedorPrecio);
        descuento.appendChild(contenedorDescuento);
        })
}
// FUNCION BOTON ELIMINAR
function Eliminar(e) {
    e.preventDefault();
    respuesta = false; 
    let localStorageActualizado = [];
    // tomo el valor y valido que haya rellenado
    let codigoVentaEliminado = document.getElementById("codigoProductoEliminado").value;
    if (codigoVentaEliminado !== "" && codigoVentaEliminado !== null) {
        localStorageActualizado = JSON.parse(localStorage.getItem("ventas"));
        localStorageActualizado.forEach(localStorageActualizado => {
            if(localStorageActualizado.codigo === codigoVentaEliminado){
                respuesta = true;
            }})
            // segun si el codigo existe borro o no
            if (respuesta){
                const codigos = localStorageActualizado.map((e) => e.codigo);    
                const indice = codigos.indexOf(codigoVentaEliminado);
                guardar.splice(indice, 1);
                localStorage.setItem("ventas", JSON.stringify(guardar)); 
                notificacionVerde("producto eliminado. F5 para ver cambios");
            }else{ 
                notificacionRoja("Codigo Inexistente");
            }            
    }else{
        notificacionRoja("Ingrese Codigo");
    }
    respuesta = false; 
}
// CODIGO PRINCIPAL
let guardar = JSON.parse(localStorage.getItem("ventas"));
ventas = guardar || [];
imprimirDatos();