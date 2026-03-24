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



let buttonMisFavoritos = document.querySelector (".button-mis-favoritos");
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

        if (usuarioNombre != "" && password != "") {


            modalContainerSesion.classList.add("modal-invisible");
            buttonLoginNo.classList.add("invisible");
            buttonLoginSi.classList.remove("invisible");
            buttonLoginSi.innerHTML = `<span class="nombre-usuario btn active">${usuarioNombre}</span>`;


    // Muestra Mis favoritos solo si me logueo

            buttonMisFavoritos.classList.remove("invisible");
    sectionMisFavoritos.classList.remove("invisible");
        }
    });



}



modalInicioSesion();







// funcion para que sigan mostrando las pills cuando se scrollea

const pillsFiltros = document.querySelector("#pills-filtros");
const logoBig = document.querySelector(".logo-big-mob");
let limiteMob = 253;

window.onscroll = function() {

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

let modalMasInformacion = () => {


    let modalMasInformacion = document.querySelector(".modal-mas-informacion");
    let btnMasDetalles = document.querySelector("#btn-mas-detalles");
    let btnCloseModalTabs = document.querySelector(".btn-close-tabs");
    let nombreTabInformacion = document.querySelector(".nombre-tab-informacion");
    let nombreTabOpiniones = document.querySelector(".nombre-tab-opiniones");
    let tabInformacion = document.querySelector("#tab-informacion");
    let tabOpiniones = document.querySelector("#tab-opiniones");

    btnMasDetalles.addEventListener("click", () => {

        // para hacer aparecer el modal cuando se hace click en el boton
        modalMasInformacion.classList.remove("modal-invisible");

        // Para cerrar el modal con la X
    btnCloseModalTabs.addEventListener("click", () => {
        modalMasInformacion.classList.add("modal-invisible");
        nombreTabInformacion.classList.add("tab-active");
        nombreTabOpiniones.classList.remove("tab-active");
        tabInformacion.classList.remove("invisible");
        tabOpiniones.classList.add("invisible");
    });

    // Para que el Tab informacion lleve a la pestaña Informacion
    nombreTabInformacion.addEventListener("click", () => {
        tabInformacion.classList.remove("invisible");
        nombreTabInformacion.classList.add("tab-active");
        nombreTabOpiniones.classList.remove("tab-active");
    });

    // Para que el Tab Opiniones lleve a la pestaña Opiniones
        nombreTabOpiniones.addEventListener("click", () => {
        tabOpiniones.classList.remove("invisible");
        tabInformacion.classList.add("invisible");
        nombreTabOpiniones.classList.add("tab-active");
        nombreTabInformacion.classList.remove("tab-active");
    });

    // Para que se invierta cada vez que el usuario toque un tab
            nombreTabInformacion.addEventListener("click", () => {
        tabInformacion.classList.remove("invisible");
        tabOpiniones.classList.add("invisible");
    });


    

    });



};

modalMasInformacion();