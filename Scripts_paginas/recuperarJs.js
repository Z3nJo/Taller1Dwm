function recuperar() {
    let token = document.getElementById("token").value.trim();

    // Validación campos vacíos
    if (token.trim() === "") {
        new bootstrap.Modal(document.getElementById('m5')).show();
        return;
    }

    if (token.trim() === "12345678"){
        new bootstrap.Modal(document.getElementById('m6')).show();
    }
    else{
        new bootstrap.Modal(document.getElementById('m7')).show();
    }

}

function cambiarContraseña() {
    let newPassword = document.getElementById("newPsw").value.trim();
    let confirmarPassword = document.getElementById("confirmarPsw").value.trim();

    if (newPassword === "" || confirmarPassword === "") {
        new bootstrap.Modal(document.getElementById('m8')).show();
        return;
    }
    if (newPassword !== confirmarPassword) {
        new bootstrap.Modal(document.getElementById('m9')).show();
        return;
    }

    // Recuperar lista de usuarios y correo de recuperación
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let correoRecuperacion = localStorage.getItem("correoRecuperacion");

    if (!correoRecuperacion) {
        alert("No se indicó ningún correo para recuperación.");
        return;
    }

    // Buscar usuario por correo
    let index = usuarios.findIndex(u => u.correo === correoRecuperacion);
    if (index !== -1) {
        usuarios[index].password = newPassword;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Confirmación visual
        new bootstrap.Modal(document.getElementById('m10')).show();

        // Eliminar correo temporal
        localStorage.removeItem("correoRecuperacion");
    } else {
        alert("No se encontró ninguna cuenta asociada a ese correo.");
    }
}

