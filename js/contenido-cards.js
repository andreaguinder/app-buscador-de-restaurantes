let todosLosRestaurantes = [];

// Fetch + Async/Await
const cargarDatos = async () => {

        try {
                const response = await fetch("../data/data.json");
                todosLosRestaurantes = await response.json();
                renderizarCards(todosLosRestaurantes);
        } catch (error) {
                console.error("Error cargando el JSON", error);
        }

};


// Función para crear las cards

const renderizarCards = (lista, contenedorSeleccionado) => {
        let containerCards = document.querySelector(".container-cards");

        if (contenedorSeleccionado) {
                containerCards = contenedorSeleccionado;
        }

        containerCards.innerHTML = "";

        lista.forEach(card => {

                let claseFavoritoActivo = "";
    const estaEnFavoritos = arrayFavoritos.some(favorito => favorito.id === card.id);
    
    if (estaEnFavoritos) {
        claseFavoritoActivo = "is-fav";
        let iFavorito = document.querySelector(".favorito");
        iFavorito.classList.add(".is-fav");
    }


                containerCards.innerHTML += `
<div class="card">
          <div class="card-header">
            <p class="card-title">${card.nombre}</p>
          </div>

          <div class="card-image">
         <button class="btn-favorito" onclick="agregarFavoritos('${card.id}')">
                    <i class="favorito fa-solid fa-heart ${claseFavoritoActivo}"></i>
                </button>
            <img src="${card.image}">
          </div>

          <div class="card-filtros-que-tiene">
          ${card.filtros.map(filtro => `<span class="filtro-seleccionado">${filtro}</span>`).join("")}
          </div>

          <button data-id="${card.id}" class="btn-mas-detalles btn">Ver detalles</button>
        </div>
    `;
        });

};

cargarDatos();


// funcion para llenar los modales de info contacto + opiniones

const llenarModal = (item) => {

        document.querySelector("#tab-informacion .telefono").innerHTML = `<i class="fa-solid fa-phone"></i> ${item.telefono}`;
        document.querySelector("#tab-informacion .direccion").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${item.direccion}`;
        document.querySelector("#tab-informacion .ubicacion").innerHTML = `
        <iframe src="${item.mapa}" width="100%" height="180" style="border:0; border-radius:0.5rem;" allowfullscreen="" loading="lazy"></iframe>
    `;

        item.opiniones.forEach((op, index) => {

                const divOpinion = document.querySelector(`.opinion${index + 1}`);

                if (divOpinion) {
                        divOpinion.innerHTML = `
                                <p class="nombre-opinion">${op.autor}</p>
                                <p>${generarEstrellas(op.estrellas)}</p>
                                <p class="texto-opinion">${op.texto}</p>
                        `
                };
        });

        // Lo muestro
        document.querySelector(".modal-mas-informacion").classList.remove("modal-invisible");
};


// Cuando escucha el click al presionar un boton, dispara el modal

document.addEventListener("click", (e) => {

        if (e.target.classList.contains("btn-mas-detalles")) {
                const idClickeado = e.target.getAttribute("data-id");
                const infoModalDetalles = todosLosRestaurantes.find(item => item.id === idClickeado);

                if (infoModalDetalles) {
                        llenarModal(infoModalDetalles);
                }

        }
});


// Funcion para crear las estrellas de las opiniones

const generarEstrellas = (cantidad) => {

    let estrellasHTML = "";
    
    for (let i = 1; i <= 5; i++) {
        if (i <= cantidad) {
            estrellasHTML += '<i class="fa-solid fa-star"></i>';
        } else {
            estrellasHTML += '<i class="fa-regular fa-star"></i>';
        }
    }
    return estrellasHTML;
};