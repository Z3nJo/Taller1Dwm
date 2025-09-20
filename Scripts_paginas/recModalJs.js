function correoInput(event) {
    const modalEl = document.getElementById('m11'); 
    if (modalEl) {
        new bootstrap.Modal(modalEl, {}).show(); // pasar {} evita el error de backdrop
    }
}

function recModal(event) {
    let correo = document.getElementById("recEmail").value.trim();

    if (correo === "") {
        alert("Debes ingresar un correo electrónico.");
        return;
    }

    // Guardar el correo de recuperación en localStorage
    localStorage.setItem("correoRecuperacion", correo);

    // Confirmación opcional en consola
    console.log("Correo de recuperación guardado:", correo);
    
    const modalEl = document.getElementById('m4'); // tu modal 4
    if (modalEl) {
        new bootstrap.Modal(modalEl, {}).show(); // pasar {} evita el error de backdrop
    }
}