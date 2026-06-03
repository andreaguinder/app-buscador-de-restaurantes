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


    // Footer año actualizable

    const yearSpan = document.getElementById('year');

    yearSpan.textContent = new Date().getFullYear();

    // --- RENDERIZAR BOTONES SI EL USUARIO YA ESTABA LOGUEADO ---
    const storageLogueado = localStorage.getItem("usuarioLogueado") === "true";
    const storageUsuario = localStorage.getItem("usuarioActual") || "";

    if (storageLogueado && storageUsuario) {
        buttonLoginNo.classList.add("invisible");
        buttonLoginSi.classList.remove("invisible");
        buttonLoginSiCerrarSesion.classList.remove("invisible");
        buttonLoginSi.innerHTML = `<span class="nombre-usuario btn active">${storageUsuario}</span>`;
        buttonMisFavoritos.classList.remove("invisible");
        sectionMisFavoritos.classList.remove("invisible");
    }
});


// Defino variables

let buttonLoginSiCerrarSesion = document.querySelector(".button-login-si-cerrar-sesion");
let modalContainerSesion = document.querySelector(".modal-container-sesion");
let btnIniciarSesion = document.querySelector("#btn-iniciar-sesion");
let btnClose = document.querySelector(".btn-close");

let buttonLoginNo = document.querySelector(".button-login-no");
let buttonLoginSi = document.querySelector(".button-login-si");
let mensajeError = document.querySelector(".mensaje-error");



let buttonMisFavoritos = document.querySelector(".button-mis-favoritos");
let sectionMisFavoritos = document.querySelector(".mis-favoritos");



// Modal para iniciar sesion

let modalInicioSesion = () => {

    btnIniciarSesion.addEventListener("click", () => {
        modalContainerSesion.classList.remove("modal-invisible");

    });

    btnClose.addEventListener("click", () => {
        modalContainerSesion.classList.add("modal-invisible");
    });

    let formModalInicio = document.querySelector("#form-modal-inicio");

    formModalInicio.addEventListener("submit", function (event) {
        event.preventDefault();

        let usuarioNombre = document.querySelector("#usuario").value;
        let password = document.querySelector("#password").value;

        if (usuarioNombre.length >= 4 && usuarioNombre != "" && password.length >= 4 && password != "") {


            modalContainerSesion.classList.add("modal-invisible");
            buttonLoginNo.classList.add("invisible");
            buttonLoginSi.classList.remove("invisible");
            buttonLoginSiCerrarSesion.classList.remove("invisible");
            buttonLoginSi.innerHTML = `<span class="nombre-usuario btn active">${usuarioNombre}</span>`;


            // Muestra Mis favoritos solo si me logueo

            buttonMisFavoritos.classList.remove("invisible");
            sectionMisFavoritos.classList.remove("invisible");
            if (typeof loginExitoso === "function") {
                loginExitoso(usuarioNombre);
            }
        } else {
            mensajeError.classList.remove("invisible");

            setTimeout(() => {
                mensajeError.classList.add("invisible");
            }, 2000);
        }
    });

}

modalInicioSesion();


// Loguearse

const loginExitoso = (nombreUsuario) => {

    usuarioLogueado = true;
    usuarioActual = nombreUsuario;

    localStorage.setItem("usuarioLogueado", "true");
    localStorage.setItem("usuarioActual", nombreUsuario);

    const favoritosGuardados = localStorage.getItem(`favoritos_${nombreUsuario}`);
    if (favoritosGuardados) {
        arrayFavoritos = JSON.parse(favoritosGuardados);
    } else {
        arrayFavoritos = [];
    }

    document.querySelector(".modal-container-sesion").classList.add("modal-invisible");

    const idPendiente = localStorage.getItem("idRestaurantePendiente");

    if (idPendiente) {
        localStorage.removeItem("idRestaurantePendiente");
        agregarFavoritos(idPendiente);

    } else {
        renderizarCards(todosLosRestaurantes);
        renderizarSeccionFavoritos();
    }

};



// Cerrar Sesion

buttonLoginSiCerrarSesion.addEventListener("click", () => {

    buttonLoginNo.classList.remove("invisible");
    buttonLoginSi.classList.add("invisible");
    buttonLoginSiCerrarSesion.classList.add("invisible");
buttonMisFavoritos.classList.add("invisible");
    sectionMisFavoritos.classList.add("invisible");

    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("idRestaurantePendiente");
    localStorage.removeItem("arrayFavoritos");

    usuarioLogueado = false;
    usuarioActual = "";
    arrayFavoritos = [];

renderizarCards(todosLosRestaurantes);
    renderizarSeccionFavoritos();
    
    location.reload();
});

// CONTROL DE SESIÓN AL RECARGAR LA PÁGINA (Mantiene al usuario adentro si no cerró sesión)
const storageLogueado = localStorage.getItem("usuarioLogueado") === "true";
const storageUsuario = localStorage.getItem("usuarioActual") || "";

if (storageLogueado && storageUsuario) {
    // Si en el storage existía la sesión, la restauramos en las variables globales
    usuarioLogueado = true;
    usuarioActual = storageUsuario;

    const favoritosGuardados = localStorage.getItem(`favoritos_${usuarioActual}`);
    if (favoritosGuardados) {
        arrayFavoritos = JSON.parse(favoritosGuardados);
    } else {
        arrayFavoritos = [];
    }
} else {
    // Si de verdad no hay nadie en el storage, limpiamos todo a cero
    usuarioLogueado = false;
    usuarioActual = "";
    arrayFavoritos = [];
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("idRestaurantePendiente");
}