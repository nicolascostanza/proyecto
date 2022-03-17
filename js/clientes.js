// VARIABLES
let clientes = [];
let respuesta = 0;
// BOTONES
const btnAgregar = document.getElementById("botonAgregar");
const btnEliminar = document.getElementById("botonEliminar");
// EVENTOS
btnAgregar.addEventListener("click", verificarFormulario);
btnEliminar.addEventListener("click", eliminarProducto);
// CLASE DE CLIENTE

class Cliente{
    constructor(nombre, empresa, telefono, email, direccion) {
        this.nombre = nombre;
        this.empresa = empresa;
        this.telefono = telefono;
        this.email = email;
        this.direccion  = direccion;
    }
}

// FUNCIONES
function verificarFormulario(e) {
    e.preventDefault();
    const nombreClienteNuevo = document.getElementById("nombreClienteNuevo").value;
    const empresaClienteNuevo = document.getElementById("empresaClienteNuevo").value;
    const telefonoClienteNuevo = document.getElementById("telefonoClienteNuevo").value;
    const emailClienteNuevo = document.getElementById("emailClienteNuevo").value;
    const direccionClienteNuevo = document.getElementById("direccionClienteNuevo").value;
    let nombres = clientes.map((e) => e.nombre);
    // console.log(respuesta);
    nombres.forEach(e => {
        if(e === nombreClienteNuevo){
            respuesta = 5;
            // console.log(respuesta);
        }else{
            respuesta = 1 ;
        }
    })
    // console.log(respuesta);
    if ((nombreClienteNuevo !== "" && nombreClienteNuevo !== 'null') && (empresaClienteNuevo !== "" && empresaClienteNuevo !== 'null') && (respuesta !== 5) && (telefonoClienteNuevo !== "" && telefonoClienteNuevo !== 'null') && (emailClienteNuevo !== "" && emailClienteNuevo !== 'null') && (direccionClienteNuevo !== "" && direccionClienteNuevo !== 'null')) {
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

function guardarDatos() {
    let nombreClienteNuevo = document.getElementById("nombreClienteNuevo").value;
    let empresaClienteNuevo = document.getElementById("empresaClienteNuevo").value;
    let telefonoClienteNuevo = document.getElementById("telefonoClienteNuevo").value;
    let emailClienteNuevo = document.getElementById("emailClienteNuevo").value;
    let direccionClienteNuevo = document.getElementById("direccionClienteNuevo").value;
    const cliente = new Cliente(nombreClienteNuevo, empresaClienteNuevo, telefonoClienteNuevo, emailClienteNuevo, direccionClienteNuevo);
    clientes.push(cliente);
    // guardo en localstorage el nuevo producto cargado
    localStorage.setItem("clientesNuevos", JSON.stringify(clientes)); 
}

function imprimirDatosNuevos() {
    let agregar = [];
    agregar = clientes[clientes.length-1]; 
    let contenedorNombre = document.createElement("div");
    contenedorNombre.innerHTML = `<h2>${agregar.nombre}</h2>`;
    let contenedorEmpresa = document.createElement("div");
    contenedorEmpresa.innerHTML = `<h2>${agregar.empresa}</h2>`;
    let contenedorTelefono = document.createElement("div");
    contenedorTelefono.innerHTML = `<h2>${agregar.telefono}</h2>`;
    let contenedorEmail = document.createElement("div");
    contenedorEmail.innerHTML = `<h2>${agregar.email}</h2>`;
    let contenedorDireccion = document.createElement("div");
    contenedorDireccion.innerHTML = ` <h2>${agregar.direccion}</h2> `;
    // APPENDCHILD DE LOS CONTENEDORES CREADOS PARA EL CRUD
    nombreNuevo.appendChild(contenedorNombre);
    empresaNuevo.appendChild(contenedorEmpresa);
    telefonoNuevo.appendChild(contenedorTelefono);
    emailNuevo.appendChild(contenedorEmail);
    direccionNuevo.appendChild(contenedorDireccion);
}
function imprimirDatos() {
    clientes.forEach(e => {
        let contenedorNombre = document.createElement("div");
        contenedorNombre.innerHTML = `<h2>${e.nombre}</h2>`;
        let contenedorEmpresa = document.createElement("div");
        contenedorEmpresa.innerHTML = `<h2>${e.empresa}</h2>`;
        let contenedorTelefono = document.createElement("div");
        contenedorTelefono.innerHTML = `<h2>${e.telefono}</h2>`;
        let contenedorEmail = document.createElement("div");
        contenedorEmail.innerHTML = `<h2>${e.email}</h2>`;
        let contenedorDireccion = document.createElement("div");
        contenedorDireccion.innerHTML = ` <h2>${e.direccion}</h2> `;
        // append childs de los contenedores creados
        nombreNuevo.appendChild(contenedorNombre);
        empresaNuevo.appendChild(contenedorEmpresa);
        telefonoNuevo.appendChild(contenedorTelefono);
        emailNuevo.appendChild(contenedorEmail);
        direccionNuevo.appendChild(contenedorDireccion);
        })  
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

function eliminarProducto() {  
    let nombreClienteEliminado = document.getElementById("nombreClienteEliminado").value;
    const nombres = guardar.map((e) => e.nombre);    
    const indice = nombres.indexOf(nombreClienteEliminado);
    guardar.splice(indice, 1);
    localStorage.setItem("clientesNuevos", JSON.stringify(guardar)); 
}

// CODIGO PRINCIPAL
let guardar = JSON.parse(localStorage.getItem("clientesNuevos"));
clientes = guardar || [];
imprimirDatos();
