// preguntar a nacho
// como hago para que actualice el producto eliminado sin recargar la pagina
// mismo pasa con el boton de editar, que borre en el momento
let stock = [];
let nuevos = [];
let stockPrevioLocalStorage = [];
let agregarProductos = document.getElementById("productoNuevo");
let productoNuevoNombre = document.getElementById("productoNuevo__nombre");
let productoNuevoProveedor = document.getElementById("productoNuevo__proveedor");
let productoNuevoCodigo = document.getElementById("productoNuevo__codigo");
let productoNuevoCantidad = document.getElementById("productoNuevo__cantidad");
let productoNuevoCostoUnitario = document.getElementById("productoNuevo__costoUnitario");
let productoNuevoCosto = document.getElementById("productoNuevo__costo");

// BOTONES

let btnAbrirFormulario = document.getElementById("btnAbrirFormulario");
// let btnAbrirFormularioEliminar = document.getElementById("btnAbrirFormularioEliminar");
// let btnAbrirFormularioEditar = document.getElementById("btnAbrirFormularioEditar");
let btnAgregar = document.getElementById("btnAgregar");
let btnEditar = document.getElementById("btnEditar");
let btnEliminar = document.getElementById("btnEliminar");
let btnImprimir = document.getElementById("btnImprimir");
// let btnSubmit = document.getElementById("btnSubmit");

// EVENTOS


btnAgregar.addEventListener("click", verificarFormulario);
btnEliminar.addEventListener("click", eliminarProducto);
// btnEditar.addEventListener("click", Edit);
// btnEditar.addEventListener("click", imprimirDatosNuevos);

// crear un nuevo producto
class Producto{
    constructor(nombre, proveedor, codigo, cantidad, costo, costoUnitario) {
        this.nombre = nombre;
        this.proveedor = proveedor;
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.costo  = costo;
        this.costoUnitario = this.costo / this.cantidad;
        this.costoUnitario = this.costoUnitario.toFixed(2);
    }
}

// FUNCION QUE GUARDA LOS DATOS DEL FORMULARIO Y IMPRIMIRLOS EN EL DIV PRINCIAPL
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

function consola(){
    console.log("prueba boton");
    
}

function imprimirDatosNuevos() {
    let agregar = [];
    agregar = stock[stock.length-1];   
    let contenedorNombre = document.createElement("div");
    contenedorNombre.innerHTML = `<h2>${agregar.nombre}</h2>`;
    let contenedorProveedor = document.createElement("div");
    contenedorProveedor.innerHTML = `<h2>${agregar.proveedor}</h2>`;
    let contenedorCodigo = document.createElement("div");
    contenedorCodigo.innerHTML = `<h2>${agregar.codigo}</h2>`;
    let contenedorCantidad = document.createElement("div");
    contenedorCantidad.innerHTML = `<h2>${agregar.cantidad}</h2>`;
    let contenedorCostoUnitario = document.createElement("div");
    contenedorCostoUnitario.innerHTML = ` <h2>$${agregar.costoUnitario}</h2> `;
    let contenedorCosto = document.createElement("div");
    contenedorCosto.innerHTML = ` <h2>$${agregar.costo}</h2> `;
    // append childs de los contenedores creados
    productoNuevoNombre.appendChild(contenedorNombre);
    productoNuevoProveedor.appendChild(contenedorProveedor);
    productoNuevoCodigo.appendChild(contenedorCodigo);
    productoNuevoCantidad.appendChild(contenedorCantidad);
    productoNuevoCostoUnitario.appendChild(contenedorCostoUnitario);
    productoNuevoCosto.appendChild(contenedorCosto);
}

function verificarFormulario(e) {
    e.preventDefault();
    let nombreProductoNuevo = document.getElementById("nombreProductoNuevo").value;
    let proveedorProductoNuevo = document.getElementById("proveedorProductoNuevo").value;
    let codigoProductoNuevo = document.getElementById("codigoProductoNuevo").value;
    let cantidadProductoNuevo = document.getElementById("cantidadProductoNuevo").value;
    let costoProductoNuevo = document.getElementById("costoProductoNuevo").value;
    if ((nombreProductoNuevo !== "" && nombreProductoNuevo !== 'null') && (proveedorProductoNuevo !== "" && proveedorProductoNuevo !== 'null') && (codigoProductoNuevo !== "" && codigoProductoNuevo !== 'null') && (cantidadProductoNuevo !== "" && cantidadProductoNuevo !== 'null') && (costoProductoNuevo !== "" && costoProductoNuevo !== 'null')) {
        console.log("bien pa");
        guardarDatos();
        imprimirDatosNuevos();
        // aca agrego la noti de toastify
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
    }else{
        console.log("mal no completo");
        // noti de mal
    }

}

function eliminarProducto() {  
    let nombreProductoEliminado = document.getElementById("nombreProductoEliminado").value;
    const nombres = guardar.map((el) => el.nombre);
    const indice = nombres.indexOf(nombreProductoEliminado);
    guardar.splice(indice, 1);
    localStorage.setItem("productosNuevos", JSON.stringify(guardar)); 
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
    productoNuevoNombre.appendChild(contenedorNombre);
    productoNuevoProveedor.appendChild(contenedorProveedor);
    productoNuevoCodigo.appendChild(contenedorCodigo);
    productoNuevoCantidad.appendChild(contenedorCantidad);
    productoNuevoCostoUnitario.appendChild(contenedorCostoUnitario);
    productoNuevoCosto.appendChild(contenedorCosto);
    })
};


// en proceso
// function Edit() {
    
//     let nombreProductoEditado = document.getElementById("nombreProductoEditado").value;
//     let proveedorProductoEditado = document.getElementById("proveedorProductoEditado").value;
//     let codigoProductoEditado = document.getElementById("codigoProductoEditado").value;
//     let cantidadProductoEditado = document.getElementById("cantidadProductoEditado").value;
//     let costoProductoEditado = document.getElementById("costoProductoEditado").value;
    
//     const codigo = stock.map((el) => el.codigo);
//     const indice = codigo.indexOf(codigoProductoEditado);

//     stock.splice(indice, 1);



//     // const producto = new Producto(nombreProductoNuevo, proveedorProductoNuevo, codigoProductoNuevo, cantidadProductoNuevo, costoProductoNuevo);
    
//     // stock.push(producto);

//     // guardo en localstorage el nuevo producto cargado
//     localStorage.setItem("productosNuevos", JSON.stringify(stock)); 
// }



// CODIGO PRINCIPAL

let guardar = JSON.parse(localStorage.getItem("productosNuevos"));

stock = guardar || [];

imprimirDatos();

// Toastify({
//     text: "This is a toast",
//     duration: 3000,
//     destination: "https://github.com/apvarun/toastify-js",
//     newWindow: true,
//     close: true,
//     gravity: "top", // `top` or `bottom`
//     position: "left", // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover
//     style: {
//       background: "linear-gradient(to right, #00b09b, #96c93d)",
//     },
//     onClick: function(){} // Callback after click
//   }).showToast();


// funcion para verificar si esta bien

