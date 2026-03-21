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

let modalInicioSesion = () => {


    let modalContainerSesion = document.querySelector(".modal-container-sesion");
    let btnIniciarSesion = document.querySelector("#btn-iniciar-sesion");
    let btnClose = document.querySelector(".btn-close");

    let btnIngresar = document.querySelector("#ingresar");
    let buttonLoginNo = document.querySelector(".button-login-no");
    let buttonLoginSi = document.querySelector(".button-login-si");

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
            buttonLoginSi.innerHTML = `<span class="nombre-usuario">${usuarioNombre}</span>`;

        }
    });







};

modalInicioSesion();