let menuAbierto = false;

// CONTROL DEL SIDEBAR
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (!menuAbierto) {
        sidebar.classList.add("active");
        menuAbierto = true;
    } else {
        sidebar.classList.remove("active");
        menuAbierto = false;
    }
}

// FORMULARIOS DE ACCESO
function mostrarFormulario(tipo) {
    const modal = document.getElementById("modal-auth");
    const container = document.getElementById("form-container");
    modal.style.display = "block";
    
    if (tipo === 'login') {
        container.innerHTML = `
            <h2 style="margin-bottom:25px; color:#FFCC00;">Bienvenido de Nuevo</h2>
            <input type="text" placeholder="Usuario o Correo">
            <input type="password" placeholder="Contraseña">
            <button class="buy-btn-USDT" style="margin-top:15px; width:100%;" onclick="alert('Iniciando sesión...')">Entrar</button>
        `;
    } else {
        container.innerHTML = `
            <h2 style="margin-bottom:25px; color:#FFCC00;">Únete a TRUCOVNZL</h2>
            <input type="text" placeholder="Usuario">
            <input type="email" placeholder="Correo">
            <input type="password" placeholder="Contraseña">
            <button class="btn-register" style="width:100%; padding:15px; margin-top:15px;" onclick="alert('Cuenta creada exitosamente')">Registrarse Ahora</button>
        `;
    }
}

function cerrarFormulario() {
    document.getElementById("modal-auth").style.display = "none";
}

// FUNCIONES DE NEGOCIO
function procesarPagoUSDT(monto) {
    if (confirm(`¿Deseas pagar ${monto} USDT por tus créditos?`)) {
        alert("Pago procesado vía red USDT. ¡Gracias por tu compra!");
    }
}

function procesarPagoBS() {
    alert("Iniciando pasarela de pago en Bolívares (VES)...");
}

function registrarDescarga(plataforma) {
    alert(`Preparando descarga para ${plataforma}. Espere un momento...`);
}

// CERRAR AL CLICAR FUERA
window.onclick = function(event) {
    const modal = document.getElementById("modal-auth");
    if (event.target == modal) {
        cerrarFormulario();
    }
}

// LÓGICA DE LA CARTA INTERACTIVA (AÑADIDA PARA FUNCIONALIDAD 3D)
document.addEventListener("DOMContentLoaded", function() {
    const card = document.getElementById('interactiveCard');
    if(card) {
        card.addEventListener('click', function() {
            // Verifica el estado actual de la rotación y lo alterna
            if (this.style.transform === "rotateY(180deg)") {
                this.style.transform = "rotateY(0deg)";
            } else {
                this.style.transform = "rotateY(180deg)";
            }
        });
    }
});
