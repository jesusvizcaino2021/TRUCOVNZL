import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, query, where, getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-id",
    appId: "tu-id-app"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let menuAbierto = false;

window.toggleMenu = function() {
    const sidebar = document.getElementById("sidebar");
    if (!menuAbierto) {
        sidebar.classList.add("active");
        menuAbierto = true;
    } else {
        sidebar.classList.remove("active");
        menuAbierto = false;
    }
};

window.mostrarFormulario = function(tipo) {
    const modal = document.getElementById("modal-auth");
    const container = document.getElementById("form-container");
    modal.style.display = "flex";
    
    if (tipo === 'login') {
        container.innerHTML = `
            <h2 style="color:#FFCC00; margin-bottom:20px;">Iniciar Sesión</h2>
            <input type="text" id="loginUser" placeholder="Usuario o Correo">
            <input type="password" id="loginPass" placeholder="Contraseña">
            <button class="buy-btn-USDT" onclick="alert('Próximamente...')">Entrar</button>
        `;
    } else {
        container.innerHTML = `
            <h2 style="color:#FFCC00; margin-bottom:20px;">Registro de Jugador</h2>
            <div style="max-height:400px; overflow-y:auto; padding-right:10px;">
                <input type="text" id="regNombre" placeholder="Nombre Completo">
                <input type="text" id="regApodo" placeholder="Nombre de Usuario (Apodo)">
                <input type="email" id="regEmail" placeholder="Correo Electrónico">
                <input type="tel" id="regTel" placeholder="WhatsApp">
                <input type="password" id="regPass" placeholder="Contraseña">
                <label style="font-size:12px;"><input type="checkbox" id="terms"> Acepto el manejo en USDT</label>
                <button class="btn-register" style="width:100%; margin-top:15px;" id="btnFinalizar">FINALIZAR REGISTRO</button>
            </div>
        `;
        document.getElementById('btnFinalizar').onclick = guardarUsuario;
    }
};

async function guardarUsuario() {
    const apodo = document.getElementById('regApodo').value.trim();
    const acepto = document.getElementById('terms').checked;

    if (!apodo || !acepto) return alert("Completa los datos y acepta los términos.");

    try {
        const q = query(collection(db, "jugadores"), where("apodo_jugador", "==", apodo));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("El apodo '" + apodo + "' ya existe. Elige otro.");
            return;
        }

        await addDoc(collection(db, "jugadores"), {
            nombre_completo: document.getElementById('regNombre').value,
            apodo_jugador: apodo,
            correo: document.getElementById('regEmail').value,
            whatsapp: document.getElementById('regTel').value,
            clave: document.getElementById('regPass').value,
            fecha_registro: new Date().toLocaleString()
        });
        
        alert("¡Registro exitoso!");
        cerrarFormulario();
    } catch (e) { alert("Error de conexión."); }
}

window.cerrarFormulario = function() {
    document.getElementById("modal-auth").style.display = "none";
};

window.procesarPagoUSDT = function(m) { alert("Pago de " + m + " USDT iniciado."); };
window.procesarPagoBS = function() { alert("Pago en VES iniciado."); };
window.registrarDescarga = function(p) { alert("Descargando para " + p); };

document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById('interactiveCard');
    if(card) {
        card.onclick = function() {
            this.style.transform = this.style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)";
        };
    }
});
