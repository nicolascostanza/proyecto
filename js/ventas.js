// IMPORTS
import { notificacionVerde, notificacionRoja } from './toast.js';
// VARIABLES
let ventas = [];
const btnAgregar = document.getElementById("btnAgregar");
const btnEliminar = document.getElementById("botonEliminar");
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
// CLASE VENTAS
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
// FUNCIONES
// FUNCION BTN AGREGAR
function AgregarVenta(e) {
    e.preventDefault();
    let productoNuevo = document.getElementById("productoNuevo").value;
    let clienteNuevo = document.getElementById("clienteNuevo").value;
    let codigoNuevo = document.getElementById("codigoNuevo").value;
    let cantidadNuevo = document.getElementById("cantidadNuevo").value;
    let precioNuevo = document.getElementById("precioNuevo").value;
    let descuentoNuevo = document.getElementById("descuentoNuevo").value;
    // verifico que los campos esten completos sino obligo a completarlos
    if (!ventas.some((e) => e.codigo === codigoNuevo)) {
		// verifico que los campos esten completos sino obligo a completarlos
		if (
			productoNuevo !== "" &&
			productoNuevo !== null &&
			clienteNuevo !== "" &&
			clienteNuevo !== null &&
			codigoNuevo !== "" &&
			codigoNuevo !== null &&
			cantidadNuevo !== "" &&
			cantidadNuevo !== null &&
			precioNuevo !== "" &&
			precioNuevo !== null &&
            descuentoNuevo !== "" &&
			descuentoNuevo !== null
		) {
			guardarDatos(productoNuevo, clienteNuevo, codigoNuevo, cantidadNuevo, precioNuevo, descuentoNuevo);
			imprimirDatosNuevos();
			notificacionVerde("Producto agregado");
		} else {
			notificacionRoja("Complete todos los campos");
		}
	} else {
		notificacionRoja("Codigo existente");
	}
};
// SUBFUNCIONES DEL BTN AGREGAR
function guardarDatos(producto, cliente, codigo, cantidad, precio, descuento) {
    const venta = new Venta (producto, cliente, codigo, cantidad, precio, descuento);
    ventas.push(venta);
    // guardo en localstorage el nuevo producto cargado
    localStorage.setItem("ListaVentas", JSON.stringify(ventas)); 
}
function imprimirDatosNuevos() {
    let agregar = [];
    agregar = ventas[ventas.length-1]; 
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
    respuesta = false; 
    let localStorageActualizado = [];
    e.preventDefault();
    // tomo el valor y valido que haya rellenado
    let codigoVentaEliminado = document.getElementById("codigoProductoEliminado").value;
    if (codigoVentaEliminado !== "" && codigoVentaEliminado !== null) {
        localStorageActualizado = JSON.parse(localStorage.getItem("ListaVentas"));
        localStorageActualizado.forEach((localStorageActualizado) => {
            if(localStorageActualizado.codigo === codigoVentaEliminado){
                respuesta = true;
            }})
            // segun si el codigo existe borro o no
            if (respuesta){
                const codigos = localStorageActualizado.map((e) => e.codigo);    
                const indice = codigos.indexOf(codigoVentaEliminado);
                guardar.splice((indice), 1);
                localStorage.setItem("ListaVentas", JSON.stringify(guardar)); 
                notificacionVerde("Venta eliminada. F5 para ver cambios");
            }else{ 
                notificacionRoja("Codigo Inexistente");
            }            
    }else{
        notificacionRoja("Ingrese Codigo");
    }
    respuesta = false; 
}
// CODIGO PRINCIPAL
let guardar = JSON.parse(localStorage.getItem("ListaVentas"));
ventas = guardar || [];
imprimirDatos();