document.addEventListener("DOMContentLoaded", function() {
    let intentosFallidos = 0;
    const MAX_INTENTOS = 5;
    const BLOQUEO_MINUTOS = 5;

    // --- Sesión e inactividad ---
    const TIEMPO_INACTIVIDAD = 5 * 60 * 1000; // 5 minutos
    let timeoutID;

    function resetIdleTimer() {
        if (timeoutID) clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            // Cerrar sesión automáticamente al superar inactividad
            sessionStorage.removeItem("usuarioActivo");
            alert("Por inactividad, se cerró tu sesión.");
            window.location.href = "login.html";
        }, TIEMPO_INACTIVIDAD);
    }

    // Escuchar actividad del usuario para resetear timer
    ['mousemove','keydown','scroll','click'].forEach(evt => {
        document.addEventListener(evt, resetIdleTimer);
    });

    // --- Función de login ---
    window.logear = function() {
        const nombreInput = document.getElementById("nombre");
        const passwordInput = document.getElementById("psw");

        if (!nombreInput || !passwordInput) return;

        let nombre = nombreInput.value.trim();
        let password = passwordInput.value.trim();

        // Validación campos vacíos
        if (nombre === "" || password === "") {
            const modal = document.getElementById('m1');
            if (modal) new bootstrap.Modal(modal).show();
            return;
        }

        // Revisar si el usuario está bloqueado
        let bloqueos = JSON.parse(localStorage.getItem("bloqueos")) || {};
        let ahora = Date.now();

        if (bloqueos[nombre] && ahora < bloqueos[nombre]) {
            const modal = document.getElementById('m3');
            if (modal) new bootstrap.Modal(modal).show();
            return;
        }

        // Recuperar usuarios guardados
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Buscar usuario válido
        let usuario = usuarios.find(u => u.nombre === nombre && u.password === password);

        if (usuario) {
            // Guardar en sessionStorage para sesión temporal (hasta cerrar pestaña)
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            resetIdleTimer(); // iniciar timer de inactividad
            intentosFallidos = 0;
            window.location.href = "inicio.html"; 
        } else {
            intentosFallidos++;
            if (intentosFallidos >= MAX_INTENTOS) {
                let desbloqueo = ahora + BLOQUEO_MINUTOS * 60 * 1000;
                bloqueos[nombre] = desbloqueo;
                localStorage.setItem("bloqueos", JSON.stringify(bloqueos));

                const modal = document.getElementById('m3');
                if (modal) new bootstrap.Modal(modal).show();
                intentosFallidos = 0;
            } else {
                const modal = document.getElementById('m2');
                if (modal) new bootstrap.Modal(modal).show();
            }
        }
    }

    // --- Función para cerrar sesión manual ---
    window.cerrarSesion = function() {
        sessionStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    }
});