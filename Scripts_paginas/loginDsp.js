document.addEventListener("DOMContentLoaded", function() {
    const MAX_INTENTOS = 5;
    const BLOQUEO_MINUTOS = 15; // bloqueos ahora duran 15 minutos
    const TIEMPO_INACTIVIDAD = 5 * 60 * 1000; // 5 minutos
    let timeoutID;

    // --- Función para reiniciar timer de inactividad ---
    function resetIdleTimer() {
        if (timeoutID) clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            sessionStorage.removeItem("usuarioActivo");
            alert("Por inactividad, se cerró tu sesión.");
            window.location.href = "loginDespachador.html";
        }, TIEMPO_INACTIVIDAD);
    }

    // Escuchar actividad del usuario
    ['mousemove', 'keydown', 'scroll', 'click'].forEach(evt => {
        document.addEventListener(evt, resetIdleTimer);
    });

    // --- Función de login ---
    window.logearDsp = function() {
        const nombreInput = document.getElementById("nombre");
        const passwordInput = document.getElementById("psw");

        if (!nombreInput || !passwordInput) return;

        const nombre = nombreInput.value.trim();
        const password = passwordInput.value.trim();

        // 1️⃣ Validación campos vacíos
        if (nombre === "" || password === "") {
            const modal = document.getElementById('m1'); // modal campos vacíos
            if (modal) new bootstrap.Modal(modal).show();
            return;
        }

        // 2️⃣ Revisar bloqueos
        let bloqueos = JSON.parse(localStorage.getItem("bloqueos")) || {};
        let intentos = JSON.parse(localStorage.getItem("intentosFallidos")) || {};
        const ahora = Date.now();

        if (bloqueos[nombre] && ahora < bloqueos[nombre]) {
            const modal = document.getElementById('m3'); // modal usuario bloqueado
            if (modal) new bootstrap.Modal(modal).show();
            return;
        } else if (bloqueos[nombre] && ahora >= bloqueos[nombre]) {
            // desbloquea usuario automáticamente después de 15 min
            delete bloqueos[nombre];
            localStorage.setItem("bloqueos", JSON.stringify(bloqueos));
            intentos[nombre] = 0;
            localStorage.setItem("intentosFallidos", JSON.stringify(intentos));
        }

        // 3️⃣ Recuperar usuarios
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // 4️⃣ Buscar usuario válido
        const usuario = usuarios.find(u => u.nombre === nombre && u.password === password);

        if (!usuario) {
            // Usuario o contraseña incorrectos
            intentos[nombre] = (intentos[nombre] || 0) + 1;
            localStorage.setItem("intentosFallidos", JSON.stringify(intentos));

            if (intentos[nombre] >= MAX_INTENTOS) {
                bloqueos[nombre] = ahora + BLOQUEO_MINUTOS * 60 * 1000; // bloquear 15 minutos
                localStorage.setItem("bloqueos", JSON.stringify(bloqueos));
                intentos[nombre] = 0; // resetear intentos
                localStorage.setItem("intentosFallidos", JSON.stringify(intentos));
                const modal = document.getElementById('m3'); // modal bloqueo
                if (modal) new bootstrap.Modal(modal).show();
            } else {
                const modal = document.getElementById('m2'); // modal intento fallido
                if (modal) new bootstrap.Modal(modal).show();
            }
            return;
        }

        // 5️⃣ Verificar rol despachador
        if (usuario.rol !== "despachador") {
            const modal = document.getElementById('m12'); // modal acceso denegado
            if (modal) new bootstrap.Modal(modal).show();
            return;
        }

        // 6️⃣ Login exitoso
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        resetIdleTimer();
        intentos[nombre] = 0; // resetear intentos del usuario
        localStorage.setItem("intentosFallidos", JSON.stringify(intentos));
        window.location.href = "pedidosPendientes.html";
    };

    // --- Función para cerrar sesión manual ---
    window.cerrarSesion = function() {
        sessionStorage.removeItem("usuarioActivo");
        window.location.href = "loginDespachador.html";
    };
});