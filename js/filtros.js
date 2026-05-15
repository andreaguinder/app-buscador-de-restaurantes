// Funcion para que sigan mostrando las pills cuando se scrollea

const pillsFiltros = document.querySelector("#pills-filtros");
const logoBig = document.querySelector(".logo-big-mob");
let limiteMob = 305;
let limitTablet = 200;
let limitDesk = 385;

const mediaQueryTablet = window.matchMedia("(min-width: 768px)");
const mediaQueryDesk = window.matchMedia("(min-width: 1024px)");


window.onscroll = function () {
    let scrollActual = window.scrollY || document.documentElement.scrollTop;
    let limiteActual = limiteMob; 

    if (mediaQueryDesk.matches) {
        limiteActual = limitDesk;
    } else if (mediaQueryTablet.matches) {
        limiteActual = limitTablet;
    }


    if (scrollActual > limiteActual) {
        pillsFiltros.classList.add("pills-fixed");
        logoBig.classList.add("invisible");
    } else {
        pillsFiltros.classList.remove("pills-fixed");
        logoBig.classList.remove("invisible");
    }
};

const estilosDeCocina = ["Todos", "Parrilla / Asado", "Pastas / Trattoria", "Minutas", "Pizzería", "Cafetería / Brunch"];
const menusEspeciales = ["Todos", "Menú infantil", "Sin TACC", "Menú Ejecutivo", "Comida rápida", "Menú Completo"];
const perfilDelLugar = ["Todos", "Familiar", "Pet Friendly", "Apto para trabajar", "Cervecería / Bar"];

// Funcion para renderizar los filtros

let filtrosActivos = {
    "Estilo de cocina": "Todos",
    "Menús Especiales": "Todos",
    "Perfil del Lugar": "Todos"
};

const renderizarFiltros = () => {
    let pillsFiltrosContainer = document.querySelector(".pills-filtros");

    pillsFiltrosContainer.innerHTML = "";

    const categorias = [{
            titulo: "Estilo de cocina",
            datos: estilosDeCocina
        },
        {
            titulo: "Menús Especiales",
            datos: menusEspeciales
        },
        {
            titulo: "Perfil del Lugar",
            datos: perfilDelLugar
        }
    ];

    categorias.forEach(categoria => {
        pillsFiltrosContainer.innerHTML += `
            <div class="filtro">
                <div class="filtros-botones">
                    <h3>${categoria.titulo}</h3>
                        <div class="filtros-separados">
                            ${categoria.datos.map(nombreFiltro => {
                                
                                let claseActiva = "";

                                if (filtrosActivos[categoria.titulo] === nombreFiltro) {
                                    claseActiva = "active";
                                }

                                return ` <button class = "btn ${claseActiva}"onclick = "toggleFiltro('${nombreFiltro}', '${categoria.titulo}')">${nombreFiltro}</button>`
                                ;}).join("")}
                        </div>
                </div>
            </div>
        `;
    });

};

renderizarFiltros();


const toggleFiltro = (filtroSeleccionado, nombreCategoria) => {
    
filtrosActivos[nombreCategoria] = filtroSeleccionado;

    renderizarFiltros(); 
    aplicarFiltros();
};

const aplicarFiltros = () => {
    // Convertimos los valores del objeto a un array y sacamos los "Todos"
    const filtrosParaComparar = Object.values(filtrosActivos).filter(valor => {
        return valor !== "Todos";
    });

    if (filtrosParaComparar.length === 0) {
        renderizarCards(todosLosRestaurantes);
        return;
    }

    const resultados = todosLosRestaurantes.filter(restaurante => {
        return filtrosParaComparar.every(filtroSeleccionado => {
            return restaurante.filtros.includes(filtroSeleccionado);
        });
    });

    renderizarCards(resultados);
};

renderizarFiltros();


// Funcion para crear seccion Mis favoritos

let arrayFavoritos = [];

const agregarFavoritos = (idBuscado) => {

    const restauranteElegido = todosLosRestaurantes.find(restaurante => restaurante.id === idBuscado);
const siYaEsFavorito = arrayFavoritos.some(favorito => favorito.id === idBuscado);

    if (siYaEsFavorito) {
        arrayFavoritos = arrayFavoritos.filter(favorito => favorito.id !== idBuscado);
    }else {
        const restauranteElegido = todosLosRestaurantes.find(restaurante => restaurante.id === idBuscado);
        arrayFavoritos.push(restauranteElegido);
    }

    renderizarCards(todosLosRestaurantes);
    renderizarSeccionFavoritos();
}

const renderizarSeccionFavoritos = () => {
    const sectionMisFavoritos = document.querySelector(".container-favoritos");
    
    renderizarCards(arrayFavoritos, sectionMisFavoritos);

};


