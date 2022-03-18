export function notificacionVerde(e) {
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
export function notificacionRoja(e) {
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