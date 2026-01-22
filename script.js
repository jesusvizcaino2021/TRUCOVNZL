// --- CONFIGURACIÓN DE FIREBASE (Datos reales de tu proyecto TrucoVNZL) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Credenciales obtenidas de tu panel de configuración
const firebaseConfig = {
  apiKey: "AIzaSyAlkL9Fw6fWFHRuvLdKAp5AqSOXsuygdnw",
  authDomain: "trucovnzl.firebaseapp.com",
  projectId: "trucovnzl",
  storageBucket: "trucovnzl.firebasestorage.app",
  messagingSenderId: "1042949845456",
  appId: "1:1042949845456:web:432beed23b92403091c9d5",
  measurementId: "G-0DJJD319Y7"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let menuAbierto = false;

// CONTROL DEL SIDEBAR (MENÚ LATERAL)
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

// FORMULARIOS DE ACCESO (LOGIN Y REGISTRO)
function mostrarFormulario(tipo) {
    const modal = document.getElementById("modal-auth");
    const container = document.getElementById("form-container");
    
    modal.style.display = "block";
    
    if (tipo === 'login') {
        container.innerHTML = `
            <h2 style="margin-bottom:25px; color:#FFCC00; text-align:center;">Iniciar Sesión</h2>
            <div style="display:flex; flex-direction:column; gap:15px;">
                <input type="text" id="loginUser" placeholder="Usuario o Correo" style="padding:12px; border-radius:8px; border:1px solid #444; background:#222; color:white;">
                <input type="password" id="loginPass" placeholder="Contraseña" style="padding:12px; border-radius:8px; border:1px solid #444; background:#222; color:white;">
                <button class="buy-btn-USDT" style="width:100%; padding:12px;" onclick="alert('Sistema de validación en desarrollo...')">Entrar</button>
            </div>
        `;
    } else if (tipo === 'register') {
        container.innerHTML = `
            <h2 style="margin-bottom:20px; color:#FFCC00; text-align:center;">Registro de Jugador</h2>
            <p style="color:#ccc; font-size:14px; text-align:center; margin-bottom:20px;">Completa tu perfil oficial para TRUCOVNZL</p>
            
            <div style="display:flex; flex-direction:column; gap:12px; max-height:400px; overflow-y:auto; padding-right:10px;">
                <label style="color:gold; font-size:12px;">INFORMACIÓN PERSONAL</label>
                <input type="text" id="regNombre" placeholder="Nombre Completo" style="padding:10px; border-radius:6px; border:1px solid #444; background:#111; color:white;">
                <input type="text" id="regApodo" placeholder="Nombre de Usuario (Apodo)" style="padding:10px; border-radius:6px; border:1px solid #444; background:#111; color:white;">
                
                <label style="color:gold; font-size:12px;">CONTACTO Y SEGURIDAD</label>
                <input type="email" id="regEmail" placeholder="Correo Electrónico" style="padding:10px; border-radius:6px; border:1px solid #444; background:#111; color:white;">
                <input type="tel" id="regTel" placeholder="Teléfono / WhatsApp" style="padding:10px; border-radius:6px; border:1px solid #444; background:#111; color:white;">
                <input type="password" id="regPass" placeholder="Crear Contraseña" style="padding:10px; border-radius:6px; border:1px solid #444; background:#111; color:white;">

                <div style="display:flex; align-items:center; gap:10px; margin-top:10px;">
                    <input type="checkbox" id="terms">
                    <label for="terms" style="color:white; font-size:12px;">Acepto los términos y el manejo de fondos en USDT</label>
                </div>

                <button class="btn-register" style="width:100%; padding:15px; background:#FFCC00; color:black; font-weight:bold; border:none; border-radius:8px; cursor:pointer; margin-top:10px;" id="btnFinalizarRegistro">
                    FINALIZAR REGISTRO
                </button>
            </div>
        `;
        
        // Listener para el botón de registro recién creado
        document.getElementById('btnFinalizarRegistro').addEventListener('click', guardarUsuario);
    }
}

// FUNCIÓN PARA GUARDAR DATOS EN FIRESTORE (MODO DE PRUEBA)
async function guardarUsuario() {
    const nombre = document.getElementById('regNombre').value;
    const apodo = document.getElementById('regApodo').value;
    const email = document.getElementById('regEmail').value;
    const tel = document.getElementById('regTel').value;
    const pass = document.getElementById('regPass').value;
    const acepto = document.getElementById('terms').checked;

    if (!nombre || !apodo || !email || !tel || !pass) {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    if (!acepto) {
        alert("Debes aceptar los términos para continuar.");
        return;
    }

    try {
        // Se envía a la colección "jugadores" configurada en tu panel
        const docRef = await addDoc(collection(db, "jugadores"), {
            nombre_completo: nombre,
            apodo: apodo,
            correo: email,
            whatsapp: tel,
            clave: pass,
            fecha_registro: new Date().toLocaleString()
        });
        
        alert("¡Registro exitoso en TRUCOVNZL! Tus datos se han guardado.");
        cerrarFormulario();
    } catch (error) {
        console.error("Error al guardar: ", error);
        alert("Error de conexión. Verifica que Firestore esté en 'Modo de prueba'.");
    }
}

function cerrarFormulario() {
    document.getElementById("modal-auth").style.display = "none";
}

// FUNCIONES DE NEGOCIO Y PAGOS
function procesarPagoUSDT(monto) {
    if (confirm(`¿Deseas pagar ${monto} USDT por tus créditos?`)) {
        alert("Redireccionando a la billetera USDT...");
    }
}

function procesarPagoBS() {
    alert("Iniciando pasarela de pago en Bolívares (VES)...");
}

function registrarDescarga(plataforma) {
    alert(`Iniciando descarga del instalador para ${plataforma}.`);
}

// --- EXPOSICIÓN GLOBAL (CRÍTICO PARA QUE FUNCIONEN LOS ONCLICK EN HTML) ---
window.toggleMenu = toggleMenu;
window.mostrarFormulario = mostrarFormulario;
window.cerrarFormulario = cerrarFormulario;
window.procesarPagoUSDT = procesarPagoUSDT;
window.procesarPagoBS = procesarPagoBS;
window.registrarDescarga = registrarDescarga;

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById("modal-auth");
    if (event.target == modal) {
        cerrarFormulario();
    }
}

// LÓGICA DE LA CARTA INTERACTIVA
document.addEventListener("DOMContentLoaded", function() {
    const card = document.getElementById('interactiveCard');
    if(card) {
        card.addEventListener('click', function() {
            if (this.style.transform === "rotateY(180deg)") {
                this.style.transform = "rotateY(0deg)";
            } else {
                this.style.transform = "rotateY(180deg)";
            }
        });
    }
});
