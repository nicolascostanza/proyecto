const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
const dom = document.getElementById("apiDolar");
fetch(url)
    .then((Response) =>  Response.json())
    .then((data) => {
        let compra = data[1].casa.compra;
        let venta = data[1].casa.venta;
        dom.innerHTML = `<h4 class="text-end"> USD: COMPRA $${compra}  VENTA $${venta}</h4>`;
    });