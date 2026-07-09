// === CUENTA REGRESIVA ===
// Establecer la fecha del evento (21 de Noviembre a las 18:00)
// Nota: Los meses en JS van de 0 a 11 (10 = Noviembre)
const eventDate = new Date("Nov 21, 2024 18:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Inyectar en el HTML
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Si el evento ya pasó
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<h2>El evento ha comenzado</h2>";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Llamar una vez para evitar retraso inicial


// === CONTROL DE ZOOM PARA EL MAPA DE ASIENTOS ===
let zoomLevel = 0.5; // Empieza al 50%
const iframe = document.getElementById('sheetFrame');

function applyZoom() {
    // Ajustamos el tamaño del iframe para que el scale no deje espacios en blanco
    iframe.style.width = (100 / zoomLevel) + "%";
    iframe.style.height = (100 / zoomLevel) + "%";
    iframe.style.transform = `scale(${zoomLevel})`;
}

document.getElementById('zoomIn').addEventListener('click', () => {
    if (zoomLevel < 2) { // Límite máximo de zoom (200%)
        zoomLevel += 0.25;
        applyZoom();
    }
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (zoomLevel > 0.5) { // Límite mínimo de zoom (50%)
        zoomLevel -= 0.25;
        applyZoom();
    }
});

// Inicializar el zoom
applyZoom();


// === REGISTRO DE PWA (APLICACIÓN MÓVIL) ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker registrado con éxito.', reg))
            .catch(err => console.log('Error al registrar el Service Worker:', err));
    });
}
