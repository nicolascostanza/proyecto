let stock = JSON.parse(localStorage.getItem("productosNuevos"));

const costo = stock.map((el) => el.costo);
const nombres = stock.map((el) => el.nombre);

let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart (ctx, {
    type:"bar", // aca va el tipo de grafico q vamos a hacer
    data:{
        labels: [...nombres], //aca van los nombres del eje x del grafico
        datasets:[{
            label: "costo", // titulo, el label principal
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
}}
);


// el label principal es el de arriba del grafico, como el titulo seria  
// en new chart le pones el type, le pasas los datos con Data, adentro de data estan los labels


console.log(stock);


