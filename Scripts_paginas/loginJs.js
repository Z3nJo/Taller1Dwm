document.addEventListener("DOMContentLoaded", function() {
    let intentosFallidos = 0;
    const MAX_INTENTOS = 5;
    const BLOQUEO_MINUTOS = 5;

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
            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
            intentosFallidos = 0;
            window.location.href = "sucess.html"; 
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
});
