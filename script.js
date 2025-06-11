// Configuración del contador
const targetDate = new Date('2025-09-12T00:00:00').getTime();

// Elementos del DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const textContainer = document.getElementById('main-text');

// Cargar contenido desde JSON
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        
        if (data && data.paragraphs) {
            textContainer.innerHTML = data.paragraphs
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }
    } catch (error) {
        console.error('Error cargando el contenido:', error);
        // Fallback content en caso de error
        textContainer.innerHTML = `
            <p>No, no existimos, pero nos va la vida en ello.</p>
            <p>Seremos una casa para los libros inquietos: curiosa, rebelde, con hambre de palabras.</p>
            <p>No, no existimos, pero ya soñamos,</p>
            <p>y soñar —lo sabemos bien— es siempre el primer paso.</p>
            <p>Muy pronto nos daremos a luz en el centro de Santa Cruz.</p>
            <p>Y saldremos a tu encuentro, porque todas las historias tienen un principio,</p>
            <p>y ésta empieza aquí,</p>
            <p>con el nacimiento de Fortunata, tu librería.</p>
        `;
    }
}

// Función para actualizar el contador
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        // Si ya pasó la fecha
        daysElement.textContent = '000';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Opcional: cambiar el mensaje
        document.querySelector('.countdown-title').textContent = '¡Ya estamos aquí!';
        return;
    }

    // Calcular tiempo restante
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar los elementos con formato de padding
    daysElement.textContent = days.toString().padStart(3, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Función para añadir efectos visuales al cambio de números
function addCountdownAnimation() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        const currentText = number.textContent;
        number.style.transform = 'scale(1.1)';
        number.style.color = '#d4af37';
        
        setTimeout(() => {
            number.style.transform = 'scale(1)';
            number.style.color = '#8b4513';
        }, 200);
    });
}

// Versión mejorada de updateCountdown con animación
let lastSecond = -1;
function updateCountdownWithAnimation() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        daysElement.textContent = '000';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        document.querySelector('.countdown-title').textContent = '¡Ya estamos aquí!';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Animación solo cuando cambia el segundo
    if (seconds !== lastSecond) {
        addCountdownAnimation();
        lastSecond = seconds;
    }

    daysElement.textContent = days.toString().padStart(3, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Función de inicialización
function init() {
    // Cargar contenido
    loadContent();
    
    // Actualizar contador inmediatamente
    updateCountdownWithAnimation();
    
    // Actualizar contador cada segundo
    setInterval(updateCountdownWithAnimation, 1000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Efecto de parallax suave para el fondo
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const grain = document.querySelector('.grain-overlay');
    if (grain) {
        grain.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}); 