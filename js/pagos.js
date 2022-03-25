// IMPORTS
import { notificacionVerde, notificacionRoja } from './toast.js';
// VARIABLES
let pagos = [];
let btnAgregar = document.getElementById("botonAgregar");
let btnEliminar = document.getElementById("botonEliminar");
let tipo = document.getElementById("tipo");
let codigo = document.getElementById("codigo");
let vencimiento = document.getElementById("vencimiento");
let valor = document.getElementById("valor");
let respuesta = Boolean;
// EVENTOS
btnAgregar.addEventListener("click", agregar);
btnEliminar.addEventListener("click", eliminar);
// CLASE DE FACTURA
class Factura{
    constructor(tipo, codigo, vencimiento, valor) {
        this.tipo = tipo;
        this.codigo = codigo;
        this.vencimiento = vencimiento;
        this.valor = valor;
    }
}
// FUNCIONES
// FUNCION BTN AGREGAR
function agregar(e) {
	e.preventDefault();
	let tipoNuevo = document.getElementById("tipoNuevo").value;
    let codigoNuevo = document.getElementById("codigoNuevo").value;
	let vencimientoNuevo = document.getElementById("vencimientoNuevo").value;
	let valorNuevo = document.getElementById("valorNuevo").value;
	if (!pagos.some((e) => e.codigo === codigoNuevo)) {
		// verifico que los campos esten completos sino obligo a completarlos
		if (
			tipoNuevo !== "" &&
			tipoNuevo !== null &&
			codigoNuevo !== "" &&
			codigoNuevo !== null &&
			vencimientoNuevo !== "" &&
			vencimientoNuevo !== null &&
			valorNuevo !== "" &&
			valorNuevo !== null
		) {
			guardarDatos(tipoNuevo, codigoNuevo, vencimientoNuevo, valorNuevo);
			imprimirDatosNuevos();
			notificacionVerde("Producto agregado");
		} else {
			notificacionRoja("Complete todos los campos");
		}
	} else {
		notificacionRoja("Codigo existente");
	}
}
// SUBFUNCIONES DEL BTN AGREGAR
function guardarDatos(tipo, codigo, vencimiento, valor) {
    const pago = new Factura(tipo, codigo, vencimiento, valor);
    pagos.push(pago);
    // guardo en localstorage el nuevo producto cargado
    localStorage.setItem("ListaPagos", JSON.stringify(pagos)); 
}
function imprimirDatosNuevos() {
    let agregar = [];
    agregar = pagos[pagos.length - 1]; 
    let contenedorTipo = document.createElement("div");
    contenedorTipo.innerHTML = `<h2>${agregar.tipo}</h2>`;
    let contenedorCodigo = document.createElement("div");
    contenedorCodigo.innerHTML = `<h2>${agregar.codigo}</h2>`;
    let contenedorVencimiento = document.createElement("div");
    contenedorVencimiento.innerHTML = `<h2>${agregar.vencimiento}</h2>`;
    let contenedorValor = document.createElement("div");
    contenedorValor.innerHTML = `<h2>${agregar.valor}</h2>`;
 
    // APPENDCHILD DE LOS CONTENEDORES CREADOS PARA EL CRUD
    tipo.appendChild(contenedorTipo);
    codigo.appendChild(contenedorCodigo);
    vencimiento.appendChild(contenedorVencimiento);
    valor.appendChild(contenedorValor);
}
// IMPRIME LOS DATOS CUANDO CARGA LA PAGINA
function imprimirDatos() {
    pagos.forEach((e) => {
        let contenedorTipo = document.createElement("div");
        contenedorTipo.innerHTML = `<h2>${e.tipo}</h2>`;
        let contenedorCodigo = document.createElement("div");
        contenedorCodigo.innerHTML = `<h2>${e.codigo}</h2>`;
        let contenedorVencimiento = document.createElement("div");
        contenedorVencimiento.innerHTML = `<h2>${e.vencimiento}</h2>`;
        let contenedorValor = document.createElement("div");
        contenedorValor.innerHTML = `<h2>${e.valor}</h2>`;
        // append childs de los contenedores creados
        tipo.appendChild(contenedorTipo);
        codigo.appendChild(contenedorCodigo);
        vencimiento.appendChild(contenedorVencimiento);
        valor.appendChild(contenedorValor);
        })
}
// FUNCION BOTON ELIMINAR
function eliminar(e) {
    respuesta = false;
	let localStorageActualizado = [];
	e.preventDefault();
	// tomo el valor y valido que haya rellenado
	let codigoPagoEliminado = document.getElementById("codigoEliminar").value;
	if (codigoPagoEliminado !== "" && codigoPagoEliminado !== null) {
		localStorageActualizado = JSON.parse(localStorage.getItem("ListaPagos"));
		localStorageActualizado.forEach((ls) => {
			if (ls.codigo === codigoPagoEliminado) {
				respuesta = true;
			}
		});
		// segun si el codigo existe borro o no
		if (respuesta) {
			const codigos = localStorageActualizado.map((e) => e.codigo);
			const indice = codigos.indexOf(codigoPagoEliminado);
			guardar.splice((indice), 1);
			localStorage.setItem("ListaPagos", JSON.stringify(guardar));
            notificacionVerde("Pago eliminado. F5 para ver cambios");
            }else{ 
                notificacionRoja("Codigo Inexistente");
            }            
    }else{
        notificacionRoja("Ingrese Codigo");
    }
    respuesta = false; 
}
// CODIGO PRINCIPAL
let guardar = JSON.parse(localStorage.getItem("ListaPagos"));
pagos = guardar || [];
imprimirDatos();
