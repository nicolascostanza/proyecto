// IMPORTS
import { notificacionVerde, notificacionRoja } from './toast.js';
// VARIABLES
let clientes = [];
let respuesta = Boolean;
// BOTONES
const btnAgregar = document.getElementById("botonAgregar");
const btnEliminar = document.getElementById("botonEliminar");
// EVENTOS
btnAgregar.addEventListener("click", agregar);
btnEliminar.addEventListener("click", eliminar);
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
function agregar(e) {
    e.preventDefault();
    const nombreClienteNuevo = document.getElementById("nombreClienteNuevo").value;
    const empresaClienteNuevo = document.getElementById("empresaClienteNuevo").value;
    const telefonoClienteNuevo = document.getElementById("telefonoClienteNuevo").value;
    const emailClienteNuevo = document.getElementById("emailClienteNuevo").value;
    const direccionClienteNuevo = document.getElementById("direccionClienteNuevo").value;
    // verifico que completo todos los campos (if anidados)
    if (
        nombreClienteNuevo !== "" &&
        nombreClienteNuevo !== null &&
        empresaClienteNuevo !== "" &&
        empresaClienteNuevo !== null &&
        telefonoClienteNuevo !== "" &&
        telefonoClienteNuevo !== null &&
        emailClienteNuevo !== "" &&
        emailClienteNuevo !== null &&
        direccionClienteNuevo !== "" &&
        direccionClienteNuevo !== null
    ) {
        // si tiene email distinto le dejo cargar el cliente
        if (!clientes.some((e) => e.email === emailClienteNuevo)){
            // paso los parametros tomados a la funcion guardardatos
            guardarDatos(nombreClienteNuevo, empresaClienteNuevo, telefonoClienteNuevo, emailClienteNuevo, direccionClienteNuevo);
			imprimirDatosNuevos();
			notificacionVerde("Cliente agregado");
        } else {
            notificacionRoja("Email ya registrado");
        }
    } else {
		notificacionRoja("Complete todos los campos");
	}
}
function guardarDatos(nombre, empresa, telefono, email, direccion) {
    const cliente = new Cliente(nombre, empresa, telefono, email, direccion);
    clientes.push(cliente);
    // guardo en localstorage el nuevo producto cargado
    localStorage.setItem("ListaClientes", JSON.stringify(clientes)); 
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
function eliminar(e) {
    respuesta = false;
	let localStorageActualizado = [];
	e.preventDefault();
	// tomo el valor y valido que haya rellenado
	let emailClienteEliminado = document.getElementById("emailClienteEliminado").value;
	if (emailClienteEliminado !== "" && emailClienteEliminado !== null) {
		localStorageActualizado = JSON.parse(localStorage.getItem("ListaClientes"));
		localStorageActualizado.forEach((ls) => {
			if (ls.email === emailClienteEliminado) {
				respuesta = true;
			}
		});
		// segun si el codigo existe borro o no
		if (respuesta) {
			const emails = localStorageActualizado.map((e) => e.email);
			const indice = emails.indexOf(emailClienteEliminado);
			guardar.splice((indice), 1);
			localStorage.setItem("ListaClientes", JSON.stringify(guardar));
            notificacionVerde("Cliente eliminado. F5 para ver cambios");
            }else{ 
                notificacionRoja("Codigo Inexistente");
            }            
    }else{
        notificacionRoja("Ingrese Codigo");
    }
    respuesta = false; 
}

// CODIGO PRINCIPAL
let guardar = JSON.parse(localStorage.getItem("ListaClientes"));
clientes = guardar || [];
imprimirDatos();
