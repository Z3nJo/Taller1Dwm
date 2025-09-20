function registrarAdmin() {
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("email").value.trim();
    let password = document.getElementById("psw").value.trim();
    let rol = document.getElementById("rol").value.trim();

    // Validar que el usuario activo sea administrador
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo || usuarioActivo.rol !== "admin") {
        alert("No tienes permisos para registrar usuarios.");
        return;
    }

    // Validación de campos vacíos
    if (nombre === "") {
        new bootstrap.Modal(document.getElementById('m2')).show();
        return;
    }
    if (correo === "") {
        new bootstrap.Modal(document.getElementById('m2')).show();
        return;
    }
    if (password === "") {
        new bootstrap.Modal(document.getElementById('m2')).show();
        return;
    }

    // Validación de longitud mínima de contraseña
    if (password.length < 8) {
        new bootstrap.Modal(document.getElementById('m3')).show();
        return;
    }

    // Recuperar usuarios previos
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Evitar duplicados
    if (usuarios.some(u => u.correo === correo)) {
        new bootstrap.Modal(document.getElementById('m5')).show();
        return;
    }

    // Crear nuevo usuario con rol elegido por el admin
    let nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol // 👈 definido desde el select del formulario
    };

    // Guardar en el array
    usuarios.push(nuevoUsuario);

    // Volver a guardar en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("Registro exitoso", nuevoUsuario);

    new bootstrap.Modal(document.getElementById('m1')).show();

    // Limpiar inputs
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
    document.getElementById("rol").value = "usuario"; // reset al valor por defecto
}
