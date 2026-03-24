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


    // FOOTER YEAR

    const yearSpan = document.getElementById('year');

    yearSpan.textContent = new Date().getFullYear();

});


// Modal para iniciar sesion

let modalInicioSesion = () => {


    let modalContainerSesion = document.querySelector(".modal-container-sesion");
    let btnIniciarSesion = document.querySelector("#btn-iniciar-sesion");
    let btnClose = document.querySelector(".btn-close");

    let buttonLoginNo = document.querySelector(".button-login-no");
    let buttonLoginSi = document.querySelector(".button-login-si");
    let mensajeError = document.querySelector(".mensaje-error");



    let buttonMisFavoritos = document.querySelector(".button-mis-favoritos");
    let sectionMisFavoritos = document.querySelector(".mis-favoritos");



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
            buttonLoginSi.innerHTML = `<span class="nombre-usuario btn active">${usuarioNombre}</span>`;


            // Muestra Mis favoritos solo si me logueo

            buttonMisFavoritos.classList.remove("invisible");
            sectionMisFavoritos.classList.remove("invisible");
        } else {
            mensajeError.classList.remove("invisible");

            setTimeout(() => {
                mensajeError.classList.add("invisible");
            }, 2000); // 3000ms = 3 segundos
        }
    });



}



modalInicioSesion();







// funcion para que sigan mostrando las pills cuando se scrollea

const pillsFiltros = document.querySelector("#pills-filtros");
const logoBig = document.querySelector(".logo-big-mob");
let limiteMob = 253;

window.onscroll = function () {

    let scrollMob = window.scrollY || document.documentElement.scrollTop;

    if (scrollMob > limiteMob) {
        pillsFiltros.classList.add("pills-fixed");
        logoBig.classList.add("invisible");
    } else {
        pillsFiltros.classList.remove("pills-fixed");
        logoBig.classList.remove("invisible");
    }

}

// Modal con tabs mas info para cards


let modalMasInformacionFuncion = () => {

    let modalInformacionDetalles = document.querySelector(".modal-mas-informacion");


    let btnCloseModalTabs = document.querySelector(".btn-close-tabs");
    let nombreTabInformacion = document.querySelector(".nombre-tab-informacion");
    let nombreTabOpiniones = document.querySelector(".nombre-tab-opiniones");
    let tabInformacion = document.querySelector("#tab-informacion");
    let tabOpiniones = document.querySelector("#tab-opiniones");


    // Para cerrar el modal con la X
    if (btnCloseModalTabs) {

        btnCloseModalTabs.addEventListener("click", () => {
            modalInformacionDetalles.classList.add("modal-invisible");
            nombreTabInformacion.classList.add("tab-active");
            nombreTabOpiniones.classList.remove("tab-active");
            tabInformacion.classList.remove("invisible");
            tabOpiniones.classList.add("invisible");
        });
    }


    if (nombreTabInformacion && nombreTabOpiniones) {


        // Para que el Tab informacion lleve a la pestaña Informacion
        nombreTabInformacion.addEventListener("click", (e) => {
            e.preventDefault();
            tabInformacion.classList.remove("invisible");
            tabOpiniones.classList.add("invisible");
            nombreTabInformacion.classList.add("tab-active");
            nombreTabOpiniones.classList.remove("tab-active");
        });

        // Para que el Tab Opiniones lleve a la pestaña Opiniones
        nombreTabOpiniones.addEventListener("click", (e) => {
            e.preventDefault();
            tabOpiniones.classList.remove("invisible");
            tabInformacion.classList.add("invisible");
            nombreTabOpiniones.classList.add("tab-active");
            nombreTabInformacion.classList.remove("tab-active");
        });

    }

};

modalMasInformacionFuncion();