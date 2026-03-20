// FUNCIONES GLOBALES
function cambiarClaseMenu() {
    var siteNav = document.getElementById("site__nav");
    var menuAbierto = document.getElementById("menu-toggle");

    if (siteNav && menuAbierto) {
        siteNav.classList.toggle("site__navAbrir");
        menuAbierto.classList.toggle("menu-abierto");

        var estaAbierto = menuAbierto.classList.contains("menu-abierto");
        menuAbierto.setAttribute("aria-expanded", estaAbierto);
    }
}

// VINCULACIÓN DE EVENTOS 
document.addEventListener("DOMContentLoaded", function () {
    const botonMenu = document.getElementById("menu-toggle");
    const siteNav = document.getElementById("site__nav");

    if (botonMenu) {
        botonMenu.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que el clic en el botón se propague al documento
            cambiarClaseMenu();
        });
    }

    // --- CERRAR AL HACER CLIC AFUERA ---
    document.addEventListener("click", (event) => {
        // Verificamos si el menú está abierto antes de hacer nada
        const estaAbierto = botonMenu.classList.contains("menu-abierto");

        if (estaAbierto) {
            // Si el clic NO fue dentro del nav ni dentro del botón de toggle
            if (!siteNav.contains(event.target) && !botonMenu.contains(event.target)) {
                cambiarClaseMenu();
            }
        }
    });
});

// PREFERENCIA DE SISTEMA
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
}


document.addEventListener('DOMContentLoaded', () => {

    // --- LIGHT / DARK MODE ---
    const checkbox = document.getElementById('theme-checkbox');
    if (checkbox) {
        checkbox.checked = document.documentElement.getAttribute('data-theme') === 'dark';
        checkbox.addEventListener('change', () => {
            const newTheme = checkbox.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    document.querySelectorAll('.btn-ver-mas').forEach(boton => {
        boton.addEventListener('click', function () {
            const card = this.closest('.card');
            const wrapper = card.querySelector('.expandible-wrapper');
            const estaAbriendo = !wrapper.classList.contains('abierto');

            if (estaAbriendo) {
                wrapper.style.maxHeight = wrapper.scrollHeight + "px";
                wrapper.classList.add('abierto');
                card.classList.add('card-abierta');
                this.innerHTML = `<i class="fa-solid fa-minus"></i>`;
            } else {
                wrapper.style.maxHeight = "0px";
                wrapper.classList.remove('abierto');
                card.classList.remove('card-abierta');
                this.innerHTML = `<i class="fa-solid fa-plus"></i>`;
            }

            // Sincronización Swiper
            let startTime = Date.now();
            const duration = 1500;

            function syncHeight() {
                const elapsed = Date.now() - startTime;
                if (typeof swiperGeneral !== 'undefined') {
                    swiperGeneral.updateAutoHeight(0);
                }
                if (elapsed < duration) {
                    requestAnimationFrame(syncHeight);
                } else if (typeof swiperGeneral !== 'undefined') {
                    swiperGeneral.updateAutoHeight(200);
                }
            }
            requestAnimationFrame(syncHeight);
        });
    });


    // FOOTER YEAR

    const yearSpan = document.getElementById('year');

    yearSpan.textContent = new Date().getFullYear();

});