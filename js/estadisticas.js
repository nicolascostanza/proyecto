// VARIABLES
let stock = JSON.parse(localStorage.getItem("productosNuevos"));
const costo = stock.map((el) => el.costo);
const costoUnitario = stock.map((el) => el.costoUnitario);
const cantidad = stock.map((el) => el.cantidad);
const nombres = stock.map((el) => el.nombre);
const eleccionVariable = document.getElementById('eleccionVariable');

// a hacer
// const eleccionTipo = document.getElementById("eleccionTipo");

// FUNCIONES PARA OCULTAR O MOSTRAR GRAFICA

function ocultarGrafico(e){
  let ocultar = document.getElementById(e);
  ocultar.style.display = "none";
}

function mostrarGrafico(e){
  let mostrar = document.getElementById(e);
  mostrar.style.display = "block";
}

// FUNCIONES DE GRAFICOS CON LIBRERIA CHARTJS


function graficoCosto () {
      let ctx = document.getElementById("myChartCosto").getContext("2d");
      let myChart = new Chart (ctx, {
        type:"bar", // aca va el tipo de grafico q vamos a hacer
        data:{
            labels: [...nombres], //aca van los nombres del eje x del grafico
            datasets:[{
                label: "Costo", // titulo, el label principal
                data: costo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1,
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    },
                    animation: {
                      onComplete: () => {
                        delayed = true;
                      },
                      delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                          delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                      },
                  },
                  },
        }]
    }});
}


function graficoCostoUnitario () {
  let ctx = document.getElementById("myChartCostoUnitario").getContext("2d");
  let myChart = new Chart (ctx, {
    type:"bar", // aca va el tipo de grafico q vamos a hacer
    data:{
        labels: [...nombres], //aca van los nombres del eje x del grafico
        datasets:[{
            label: "costo Unitario", // titulo, el label principal
            data: costoUnitario,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                },
                animation: {
                  onComplete: () => {
                    delayed = true;
                  },
                  delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                  },
              },
              },
    }]
}});
}


function graficoCantidad () {
  let ctx = document.getElementById("myChartCantidad").getContext("2d");
  let myChart = new Chart (ctx, {
    type:"bar", // aca va el tipo de grafico q vamos a hacer
    data:{
        labels: [...nombres], //aca van los nombres del eje x del grafico
        datasets:[{
            label: "Cantidad", // titulo, el label principal
            data: cantidad,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                },
                animation: {
                  onComplete: () => {
                    delayed = true;
                  },
                  delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                  },
              },
              },
    }]
}});
}


// EVENTOS

eleccionVariable.addEventListener('change', (e) => {
  let valor = e.target.value;
  console.log(valor);
  
  
  if (valor == "costo") {
    ocultarGrafico("myChartCostoUnitario");
    ocultarGrafico("myChartCantidad");
    mostrarGrafico("myChartCosto");
    graficoCosto();
  }
  else if (valor == "costoUnitario") {
    ocultarGrafico("myChartCosto");
    ocultarGrafico("myChartCantidad")
    mostrarGrafico("myChartCostoUnitario");
    graficoCostoUnitario();
  }
  else if (valor == "cantidad"){
    ocultarGrafico("myChartCosto");
    ocultarGrafico("myChartCostoUnitario");
    mostrarGrafico("myChartCantidad");
    graficoCantidad();
  }
});

// a hacer cambio de tipo de grafico

// eleccionTipo.addEventListener('change', (e) => {
//   let valor = e.target.value;
//   console.log(valor);
//   if (valor == "line"){
    
//   }else if (valor == "bar"){
//     graficoCostoUnitario(valor);
//   }else if (valor == "pie"){

//   }
// })


console.log(stock);


