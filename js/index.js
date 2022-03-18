// import{notificacionVerde, notificacionRoja} from "./toast.js"
$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});

// aca empieza lo mio, lo de arriba es robado
// VARIABLES
let stock = [];
let btnAgregar = document.getElementById("botonAgregar");
let btnEditar = document.getElementById("botonEditar");
let btnEliminar = document.getElementById("botonEliminar");
let nombreNuevo = document.getElementById("nombreNuevo");
let proveedorNuevo = document.getElementById("proveedorNuevo");
let codigoNuevo = document.getElementById("codigoNuevo");
let cantidadNuevo = document.getElementById("cantidadNuevo");
let costoNuevo = document.getElementById("costoNuevo");
let costoUnitarioNuevo = document.getElementById("costoUnitarioNuevo");
let prueba = document.getElementById("editarProducto");
// EVENTOS
btnAgregar.addEventListener("click", verificarFormulario);
// btnEditar.addEventListener("click", Editar);
// btnAgregar.addEventListener("click", mismoProducto);
// para boton agregar
let respuesta = 0;
console.log(respuesta);
function verificarFormulario(e) {
    e.preventDefault();
    let nombreProductoNuevo = document.getElementById("nombreProductoNuevo").value;
    let proveedorProductoNuevo = document.getElementById("proveedorProductoNuevo").value;
    let codigoProductoNuevo = document.getElementById("codigoProductoNuevo").value;
    let cantidadProductoNuevo = document.getElementById("cantidadProductoNuevo").value;
    let costoProductoNuevo = document.getElementById("costoProductoNuevo").value;
    let codigos = stock.map((e) => e.codigo);
    // console.log(respuesta);
    codigos.forEach(e => {
        if(e === codigoProductoNuevo){
            respuesta = 5;
            // console.log(respuesta);
        }else{
            respuesta = 1 ;
        }
    })
    // console.log(respuesta);
    if ((nombreProductoNuevo !== "" && nombreProductoNuevo !== 'null') && (proveedorProductoNuevo !== "" && proveedorProductoNuevo !== 'null') && (respuesta !== 5) && (codigoProductoNuevo !== "" && codigoProductoNuevo !== 'null') && (cantidadProductoNuevo !== "" && cantidadProductoNuevo !== 'null') && (costoProductoNuevo !== "" && costoProductoNuevo !== 'null')) {
        guardarDatos();
        imprimirDatosNuevos();
        notificacionVerde("Producto agregado");
        // console.log(respuesta);
    }else{
        notificacionRoja("Complete todos los campos");
        // console.log(respuesta);
    }
    // console.log(respuesta);
}
// FUNCIONES DE TOAST 
function notificacionVerde(e) {
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
// FUNCIONES PARA BTN AGREGAR
function guardarDatos() {
    let nombreProductoNuevo = document.getElementById("nombreProductoNuevo").value;
    let proveedorProductoNuevo = document.getElementById("proveedorProductoNuevo").value;
    let codigoProductoNuevo = document.getElementById("codigoProductoNuevo").value;
    let cantidadProductoNuevo = document.getElementById("cantidadProductoNuevo").value;
    let costoProductoNuevo = document.getElementById("costoProductoNuevo").value;
    const producto = new Producto(nombreProductoNuevo, proveedorProductoNuevo, codigoProductoNuevo, cantidadProductoNuevo, costoProductoNuevo);
    stock.push(producto);
    // guardo en localstorage el nuevo producto cargado
    localStorage.setItem("productosNuevos", JSON.stringify(stock)); 
}
function imprimirDatosNuevos() {
    let agregar = [];
    agregar = stock[stock.length-1]; 
    let costounitario = 0;
    costounitario = ((agregar.costo)/(agregar.cantidad)).toFixed(2);
    let contenedorNombre = document.createElement("div");
    contenedorNombre.innerHTML = `<h2>${agregar.nombre}</h2>`;
    let contenedorProveedor = document.createElement("div");
    contenedorProveedor.innerHTML = `<h2>${agregar.proveedor}</h2>`;
    let contenedorCodigo = document.createElement("div");
    contenedorCodigo.innerHTML = `<h2>${agregar.codigo}</h2>`;
    let contenedorCantidad = document.createElement("div");
    contenedorCantidad.innerHTML = `<h2>${agregar.cantidad}</h2>`;
    let contenedorCosto = document.createElement("div");
    contenedorCosto.innerHTML = ` <h2>$${agregar.costo}</h2> `;
    let contenedorCostoUnitario = document.createElement("div");
    contenedorCostoUnitario.innerHTML = `<h2>$${costounitario}</h2>`;
    // APPENDCHILD DE LOS CONTENEDORES CREADOS PARA EL CRUD
    nombreNuevo.appendChild(contenedorNombre);
    proveedorNuevo.appendChild(contenedorProveedor);
    codigoNuevo.appendChild(contenedorCodigo);
    cantidadNuevo.appendChild(contenedorCantidad);
    costoNuevo.appendChild(contenedorCosto);
    costoUnitarioNuevo.appendChild(contenedorCostoUnitario);
}
// CLASE DE PRODUCTO

class Producto{
    constructor(nombre, proveedor, codigo, cantidad, costo, costoUnitario) {
        this.nombre = nombre;
        this.proveedor = proveedor;
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.costo  = costo;
        this.costoUnitario = ((this.costo) / (this.cantidad)).toFixed(2);
    }
}

function imprimirDatos() {
    stock.forEach(e => {
        let contenedorNombre = document.createElement("div");
        contenedorNombre.innerHTML = `<h2>${e.nombre}</h2>`;
        let contenedorProveedor = document.createElement("div");
        contenedorProveedor.innerHTML = `<h2>${e.proveedor}</h2>`;
        let contenedorCodigo = document.createElement("div");
        contenedorCodigo.innerHTML = `<h2>${e.codigo}</h2>`;
        let contenedorCantidad = document.createElement("div");
        contenedorCantidad.innerHTML = `<h2>${e.cantidad}</h2>`;
        let contenedorCostoUnitario = document.createElement("div");
        contenedorCostoUnitario.innerHTML = ` <h2>$${e.costoUnitario}</h2> `;
        let contenedorCosto = document.createElement("div");
        contenedorCosto.innerHTML = ` <h2>$${e.costo}</h2> `;
        // append childs de los contenedores creados
        nombreNuevo.appendChild(contenedorNombre);
        proveedorNuevo.appendChild(contenedorProveedor);
        codigoNuevo.appendChild(contenedorCodigo);
        cantidadNuevo.appendChild(contenedorCantidad);
        costoNuevo.appendChild(contenedorCosto);
        costoUnitarioNuevo.appendChild(contenedorCostoUnitario);
        })
}

function eliminarProducto() {  
    let codigoProductoEliminado = document.getElementById("codigoProductoEliminado").value;
    const codigo = guardar.map((e) => e.codigo);    
    const indice = codigo.indexOf(codigoProductoEliminado);
    guardar.splice(indice, 1);
    localStorage.setItem("productosNuevos", JSON.stringify(guardar)); 
}

// CODIGO PRINCIPAL
let guardar = JSON.parse(localStorage.getItem("productosNuevos"));
stock = guardar || [];
imprimirDatos();
