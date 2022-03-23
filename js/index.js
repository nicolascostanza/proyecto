// VARIABLES
let stock = [];
let btnAgregar = document.getElementById("botonAgregar");
let btnEliminar = document.getElementById("botonEliminar");
let nombreNuevo = document.getElementById("nombreNuevo");
let proveedorNuevo = document.getElementById("proveedorNuevo");
let codigoNuevo = document.getElementById("codigoNuevo");
let cantidadNuevo = document.getElementById("cantidadNuevo");
let costoNuevo = document.getElementById("costoNuevo");
let costoUnitarioNuevo = document.getElementById("costoUnitarioNuevo");
let respuesta = Boolean;
// EVENTOS
btnAgregar.addEventListener("click", agregar);
btnEliminar.addEventListener("click", eliminar);
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
// FUNCIONES
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
function agregar (e) {
        respuesta = false;
        let localStorageActualizado = [];
        e.preventDefault();
        let nombreProductoNuevo = document.getElementById("nombreProductoNuevo").value;
        let proveedorProductoNuevo = document.getElementById("proveedorProductoNuevo").value;
        let codigoProductoNuevo = document.getElementById("codigoProductoNuevo").value;
        let cantidadProductoNuevo = document.getElementById("cantidadProductoNuevo").value;
        let costoProductoNuevo = document.getElementById("costoProductoNuevo").value;
        // verifico que los campos esten completos sino obligo a completarlos
        if ((nombreProductoNuevo !== "" && nombreProductoNuevo !== null) &&
        (proveedorProductoNuevo !== "" && proveedorProductoNuevo !== null) &&
        (codigoProductoNuevo !== "" && codigoProductoNuevo !== null) &&
        (cantidadProductoNuevo !== "" && cantidadProductoNuevo !== null) &&
        (costoProductoNuevo !== "" && costoProductoNuevo !== null)) {
            // traigo el localstorage actualizado para verificar que el codigo no este en uso
            localStorageActualizado = JSON.parse(localStorage.getItem("productosNuevos"));
            localStorageActualizado.forEach(localStorageActualizado => {
                if(localStorageActualizado.codigo === codigoProductoNuevo){
                    respuesta = true;
                }
            })
            if (respuesta){
                notificacionRoja("Codigo existente");
            }else{ 
                guardarDatos();
                imprimirDatosNuevos();
                notificacionVerde("Producto agregado");
            }            
        }else{
            notificacionRoja("Complete todos los campos");
        }
        // le otorgo otro valor a respuesta para el proximo foreach de localStorageNuevo
        respuesta = false;
};
// SUBFUNCIONES DEL BTN AGREGAR
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
// IMPRIME LOS DATOS CUANDO CARGA LA PAGINA
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
// FUNCION BOTON ELIMINAR
function eliminar(e) {
    respuesta = false; 
    let localStorageActualizado = [];
    e.preventDefault();
    // tomo el valor y valido que haya rellenado
    let codigoProductoEliminado = document.getElementById("codigoProductoEliminado").value;
    if (codigoProductoEliminado !== "" && codigoProductoEliminado !== null) {
        localStorageActualizado = JSON.parse(localStorage.getItem("productosNuevos"));
        localStorageActualizado.forEach(localStorageActualizado => {
            if(localStorageActualizado.codigo === codigoProductoEliminado){
                respuesta = true;
            }})
            // segun si el codigo existe borro o no
            if (respuesta){
                const codigos = localStorageActualizado.map((e) => e.codigo);    
                const indice = codigos.indexOf(codigoProductoEliminado);
                guardar.splice(indice, 1);
                localStorage.setItem("productosNuevos", JSON.stringify(guardar)); 

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
let guardar = JSON.parse(localStorage.getItem("productosNuevos"));
stock = guardar || [];
imprimirDatos();
