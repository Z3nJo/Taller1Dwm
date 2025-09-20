document.addEventListener("DOMContentLoaded", function() {
    const MAX_INTENTOS = 5;
    const BLOQUEO_MINUTOS = 5;
    let intentosFallidos = 0;

    window.logearDsp = function() {
        const nombreInput = document.getElementById("nombre");
        const passwordInput = document.getElementById("psw");
        const rol = document.getElementById("rol");

        if (!nombreInput || !passwordInput) return;

        const nombre = nombreInput.value.trim();
        const password = passwordInput.value.trim();

        // 1. Validación de campos vacíos
        if (nombre === "" || password === "") {
            const modal = document.getElementById('m1'); // modal campos vacíos
            if (modal) new bootstrap.Modal(modal).show();
            return;
        }

        // 2. Revisar bloqueos por intentos fallidos
        const bloqueos = JSON.parse(localStorage.getItem("bloqueos")) || {};
        const ahora = Date.now();

        if (bloqueos[nombre] && ahora < bloqueos[nombre]) {
            const modal = document.getElementById('m3'); // modal usuario bloqueado
            if (modal) new bootstrap.Modal(modal).show();
            return;
        }

        // 3. Recuperar usuarios guardados
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // 4. Buscar usuario válido
        const usuario = usuarios.find(u => u.nombre === nombre && u.password === password);

        if (!usuario) {
            // Usuario o contraseña incorrectos
            intentosFallidos++;
            if (intentosFallidos >= MAX_INTENTOS) {
                bloqueos[nombre] = ahora + BLOQUEO_MINUTOS * 60 * 1000; // bloquear 5 minutos
                localStorage.setItem("bloqueos", JSON.stringify(bloqueos));
                const modal = document.getElementById('m3'); // modal bloqueo
                if (modal) new bootstrap.Modal(modal).show();
                intentosFallidos = 0;
            } else {
                const modal = document.getElementById('m2'); // modal intento fallido
                if (modal) new bootstrap.Modal(modal).show();
            }
            return;
        }

        // 5. Verificar rol de despachador
        if (usuario.rol !== "despachador") {
            const modal = document.getElementById('m12'); // modal acceso denegado por rol
            if (modal) new bootstrap.Modal(modal).show();
            return;
        }

        // 6. Login exitoso
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        intentosFallidos = 0;
        window.location.href = "sucessDsp.html";
    };
});
