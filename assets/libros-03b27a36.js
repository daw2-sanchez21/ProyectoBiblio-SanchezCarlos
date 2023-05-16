import { L as Libros, R as ReservaLibros } from "./claseLibros-d15c9d53.js";
import "./main-300f7e38.js";
const libros = {
  template: `
    <h1>Lista de Libros</h1>
    <div class="container">
      <form id="search-id" class="d-flex p-5">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
        <button class="btn" style="border-color:#77B7E1;" type="submit">Search</button>
      </form>
    </div>
    <div class="container" id="libros-list"></div>
  `,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#FFFFFF";
    main.style.height = "auto";
    const librosList = document.createElement("div");
    librosList.classList.add("row");
    const libros2 = await Libros.getAll();
    libros2.forEach((libro) => {
      const libroItem = document.createElement("div");
      libroItem.classList.add("card", "col-3", "p-3", "m-3");
      libroItem.style.width = "18rem";
      libroItem.innerHTML = `
            <img src="${libro.imagen}" id="img-${libro.id}" class="card-img-top" alt="${libro.titulo} style="width: 200px; height: 220px;">
            <div class="card-body">
              <h5 class="card-title">${libro.titulo}</h5>
              <p class="card-text">${libro.autor}</p>
              <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro.id}">Reserva</a>
            </div>`;
      const imagen = libroItem.querySelector(`#img-${libro.id}`);
      imagen.addEventListener("click", async (e) => {
        const imagenId = e.target.id;
        const nuevoId = imagenId.replace("img-", "");
        const guardarId = document.querySelector("#guardar-id");
        guardarId.value = nuevoId;
        window.location = "#/descripcion";
      });
      const libroReserva = libroItem.querySelector(`#reserva-${libro.id}`);
      libroReserva.addEventListener("click", async (e) => {
        console.log("Boton reservar");
        const libroReservaId = e.target.id;
        const libroId = libroReservaId.replace("reserva-", "");
        swal("Desea reservar el libro?", {
          buttons: ["Cancelar", "Confirmar"]
        }).then(async (value) => {
          if (value) {
            await ReservaLibros.estado(libroId);
          } else {
            swal({ title: "Cancelado", icon: "warning" });
          }
        });
      });
      librosList.appendChild(libroItem);
    });
    const librosListContainer = document.getElementById("libros-list");
    librosListContainer.appendChild(librosList);
    const formsearch = document.querySelector("#search-id");
    formsearch.addEventListener("input", async (e) => {
      e.preventDefault();
      const texto = e.target.value;
      console.log(texto);
      const librosSearch = await Libros.getSearch(texto);
      librosList.innerHTML = "";
      librosSearch.forEach((libro2) => {
        const nuevoLibro = document.createElement("div");
        nuevoLibro.classList.add("card", "col-3", "p-3", "m-3", "animacion");
        nuevoLibro.style.width = "18rem";
        nuevoLibro.innerHTML = `
                <img src="${libro2.imagen}" class="card-img-top" alt="${libro2.titulo} style="width: 200px; height: 220px;">
                <div class="card-body">
                  <h5 class="card-title">${libro2.titulo}</h5>
                  <p class="card-text">${libro2.autor}</p>
                  <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro2.id}">Reserva</a>
                </div>    
              `;
        const libroReserva = nuevoLibro.querySelector(`#reserva-${libro2.id}`);
        libroReserva.addEventListener("click", async (e2) => {
          console.log("Boton reservar");
          const libroReservaId = e2.target.id;
          const libroId = libroReservaId.replace("reserva-", "");
          swal("Desea reservar el libro?", {
            buttons: ["Cancelar", "Confirmar"]
          }).then(async (value) => {
            if (value) {
              await ReservaLibros.estado(libroId);
            } else {
              swal({ title: "Cancelado", icon: "warning" });
            }
          });
        });
        librosList.appendChild(nuevoLibro);
      });
    });
  }
};
export {
  libros as default
};
