// IMPORTS
import { notificacionVerde, notificacionRoja } from './toast.js';
// VARIABLES
let employees = [];
let btnAgregar = document.getElementById("botonAgregar");
let btnEliminar = document.getElementById("botonEliminar");
let nombre = document.getElementById("nombre");
let telefono = document.getElementById("telefono");
let direccion = document.getElementById("direccion");
let ingreso = document.getElementById("ingreso");
let email = document.getElementById("email");
let respuesta = Boolean;
// EVENTOS
btnAgregar.addEventListener("click", agregar);
btnEliminar.addEventListener("click", eliminar);
// CLASE DE EMPLOYEE
class Employee{
    constructor(nombre, telefono, direccion, ingreso, email) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
        this.ingreso = ingreso;
        this.email  = email;
    }
}
// FUNCIONES
// FUNCION BTN AGREGAR
function agregar(e) {
	e.preventDefault();
	let nombreNuevo = document.getElementById("nombreNuevo").value;
	let telefonoNuevo = document.getElementById("telefonoNuevo").value;
	let direccionNuevo = document.getElementById("direccionNuevo").value;
	let ingresoNuevo = document.getElementById("ingresoNuevo").value;
	let emailNuevo = document.getElementById("emailNuevo").value;
	if (!employees.some((e) => e.nombre === nombreNuevo)) {
		// verifico que los campos esten completos sino obligo a completarlos
		if (
			nombreNuevo !== "" &&
			nombreNuevo !== null &&
			telefonoNuevo !== "" &&
			telefonoNuevo !== null &&
			direccionNuevo !== "" &&
			direccionNuevo !== null &&
			ingresoNuevo !== "" &&
			ingresoNuevo !== null &&
			emailNuevo !== "" &&
			emailNuevo !== null
		) {
			guardarDatos(nombreNuevo, telefonoNuevo, direccionNuevo, ingresoNuevo, emailNuevo);
			imprimirDatosNuevos();
			notificacionVerde("Empleado agregado");
		} else {
			notificacionRoja("Complete todos los campos");
		}
	} else {
		notificacionRoja("Empleado existente");
	}
}
// SUBFUNCIONES DEL BTN AGREGAR
function guardarDatos(nombre, telefono, direccion, ingreso, email) {
    const employee = new Employee(nombre, telefono, direccion, ingreso, email);
    employees.push(employee);
    // guardo en localstorage el nuevo producto cargado
    localStorage.setItem("ListaEmpleados", JSON.stringify(employees)); 
}
function imprimirDatosNuevos() {
    let agregar = [];
    agregar = employees[employees.length - 1]; 
    let contenedorNombre = document.createElement("div");
    contenedorNombre.innerHTML = `<h2>${agregar.nombre}</h2>`;
    let contenedorTelefono = document.createElement("div");
    contenedorTelefono.innerHTML = `<h2>${agregar.telefono}</h2>`;
    let contenedorDireccion = document.createElement("div");
    contenedorDireccion.innerHTML = `<h2>${agregar.direccion}</h2>`;
    let contenedorIngreso = document.createElement("div");
    contenedorIngreso.innerHTML = `<h2>${agregar.ingreso}</h2>`;
    let contenedorEmail = document.createElement("div");
    contenedorEmail.innerHTML = ` <h2>$${agregar.email}</h2> `;
    // APPENDCHILD DE LOS CONTENEDORES CREADOS PARA EL CRUD
    nombre.appendChild(contenedorNombre);
    telefono.appendChild(contenedorTelefono);
    direccion.appendChild(contenedorDireccion);
    ingreso.appendChild(contenedorIngreso);
    email.appendChild(contenedorEmail);
}
// IMPRIME LOS DATOS CUANDO CARGA LA PAGINA
function imprimirDatos() {
    employees.forEach((e) => {
        let contenedorNombre = document.createElement("div");
        contenedorNombre.innerHTML = `<h2>${e.nombre}</h2>`;
        let contenedorTelefono = document.createElement("div");
        contenedorTelefono.innerHTML = `<h2>${e.telefono}</h2>`;
        let contenedorDireccion = document.createElement("div");
        contenedorDireccion.innerHTML = `<h2>${e.direccion}</h2>`;
        let contenedorIngreso = document.createElement("div");
        contenedorIngreso.innerHTML = `<h2>${e.ingreso}</h2>`;
        let contenedorEmail = document.createElement("div");
        contenedorEmail.innerHTML = ` <h2>$${e.email}</h2> `;
        // append childs de los contenedores creados
        nombre.appendChild(contenedorNombre);
        telefono.appendChild(contenedorTelefono);
        direccion.appendChild(contenedorDireccion);
        ingreso.appendChild(contenedorIngreso);
        email.appendChild(contenedorEmail);
        })
}
// FUNCION BOTON ELIMINAR
function eliminar(e) {
    respuesta = false;
	let localStorageActualizado = [];
	e.preventDefault();
	// tomo el valor y valido que haya rellenado
	let nombreEliminado = document.getElementById("nombreEliminado").value;
	if (nombreEliminado !== "" && nombreEliminado !== null) {
		localStorageActualizado = JSON.parse(localStorage.getItem("ListaEmpleados"));
		localStorageActualizado.forEach((ls) => {
			if (ls.nombre === nombreEliminado) {
				respuesta = true;
			}
		});
		// segun si el codigo existe borro o no
		if (respuesta) {
			const codigos = localStorageActualizado.map((e) => e.nombre);
			const indice = codigos.indexOf(nombreEliminado);
			guardar.splice((indice), 1);
			localStorage.setItem("ListaEmpleados", JSON.stringify(guardar));
            notificacionVerde("Empleado eliminado. F5 para ver cambios");
            }else{ 
                notificacionRoja("nombre Inexistente");
            }            
    }else{
        notificacionRoja("Ingrese nombre");
    }
    respuesta = false; 
}
// CODIGO PRINCIPAL
let guardar = JSON.parse(localStorage.getItem("ListaEmpleados"));
employees = guardar || [];
imprimirDatos();
