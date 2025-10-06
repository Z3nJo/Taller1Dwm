document.addEventListener("DOMContentLoaded", function() {
    const TIEMPO_INACTIVIDAD = 5 * 60 * 1000; // 5 minutos
    let timeoutID;

    function resetIdleTimer() {
        if (timeoutID) clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            // Cerrar sesión automáticamente por inactividad
            sessionStorage.removeItem("usuarioActivo");
            alert("Por inactividad, se cerró tu sesión.");
            window.location.href = "login.html";
        }, TIEMPO_INACTIVIDAD);
    }

    // Escuchar actividad del usuario para resetear timer
    ['mousemove','keydown','scroll','click'].forEach(evt => {
        document.addEventListener(evt, resetIdleTimer);
    });

    window.registrar = function() {
        let nombre = document.getElementById("nombre").value.trim();
        let correo = document.getElementById("email").value.trim();
        let password = document.getElementById("psw").value.trim();

        // Validación campos vacíos
        if (!nombre || !correo || !password) {
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
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        console.log("Registro exitoso", nuevoUsuario);

        // Guardar usuario en sessionStorage para mantener sesión activa
        sessionStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
        resetIdleTimer(); // iniciar timer de inactividad

        // Mostrar modal de éxito
        new bootstrap.Modal(document.getElementById('m1')).show();

        // (opcional) limpiar inputs
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("psw").value = "";

        // Redirigir a inicio después de cerrar modal
        const modalEl = document.getElementById('m1');
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalEl.addEventListener('hidden.bs.modal', () => {
            window.location.href = "inicio.html";
        });
    }

    // --- Función para cerrar sesión manual ---
    window.cerrarSesion = function() {
        sessionStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    }
});