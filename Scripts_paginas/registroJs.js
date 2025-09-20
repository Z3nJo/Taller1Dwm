function registrar() {
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("email").value.trim();
    let password = document.getElementById("psw").value.trim();

    // Validación campos vacíos
    if (nombre.trim() === "") {
        new bootstrap.Modal(document.getElementById('m2')).show();
        return;
    }
    if (correo.trim() === "") {
        new bootstrap.Modal(document.getElementById('m2')).show();
        return;
    }
    if (password === "") {
        new bootstrap.Modal(document.getElementById('m2')).show();
        return;
    }

    // Validación longitud mínima de contraseña
    if (password.length < 8) {
        new bootstrap.Modal(document.getElementById('m3')).show();
        return;
    }

    // Recuperar usuarios previos del localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Crear nuevo usuario
    let nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        rol: "usuario"
    };

    // Guardar en el array
    usuarios.push(nuevoUsuario);

    // Volver a guardar en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("Registro exitoso", nuevoUsuario);

    // Mostrar modal de éxito
    new bootstrap.Modal(document.getElementById('m1')).show();

    // (opcional) limpiar inputs
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
}
