import { S as Salas } from "./vistaSalas-3488af29.js";
import "./main-d86f3980.js";
const salas = {
  template: `
    <h1>Lista de salas</h1>
    <div class="container">
      <form id="search-id-sala" class="d-flex p-5">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchSala">
        <button class="btn" style="border-color:#77B7E1;" type="submit">Search</button>
      </form>
    </div>
    <div class="container" id="sala-list"></div>
  `,
  async script() {
    console.log("pruebas supabase");
    const main = document.querySelector("main");
    main.style.backgroundColor = "#FFFFFF";
    main.style.backgroundImage = 'url("")';
    const salaList = document.createElement("div");
    salaList.classList.add("row");
    const salas2 = await Salas.getAllSalas();
    salas2.forEach((sala) => {
      const salaItem = document.createElement("div");
      salaItem.innerHTML = `
          <div class="card p-3 m-3 container-fluid">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${sala.imagen}" class="img-fluid rounded-start" alt="${sala.nombre}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${sala.nombre}</h5>
                <p class="card-text">${sala.sala_descripcion}</p>
                <p class="card-text"><small class="text-muted">Aforo: ${sala.aforo}</small></p>
                <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${sala.id}">Reserva</a>
              </div>
            </div>
          </div>
        </div>
          `;
      const salaReserva = salaItem.querySelector(`#reserva-${sala.id}`);
      salaReserva.addEventListener("click", async (e) => {
        console.log("Boton reservar");
        const salaReservaId = e.target.id;
        const salaId = salaReservaId.replace("reserva-", "");
        swal("Desea reservar la sala?", {
          buttons: ["Cancelar", "Confirmar"]
        }).then(async (value) => {
          if (value) {
            await Salas.estado(salaId);
          } else {
            swal({ title: "Cancelado", icon: "warning" });
          }
        });
      });
      salaList.appendChild(salaItem);
    });
    const salaListContainer = document.getElementById("sala-list");
    salaListContainer.appendChild(salaList);
    const formsearch = document.querySelector("#search-id-sala");
    formsearch.addEventListener("submit", async (e) => {
      e.preventDefault();
      const texto = e.target.searchSala.value;
      const salasSearch = await Salas.getSearchSalas(texto);
      salaList.innerHTML = "";
      salasSearch.forEach((sala) => {
        const salaItem = document.createElement("div");
        salaItem.innerHTML = `
          <div class="card p-3 m-3 container-fluid">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${sala.imagen}" class="img-fluid rounded-start" alt="${sala.nombre}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${sala.nombre}</h5>
                <p class="card-text">${sala.sala_descripcion}</p>
                <p class="card-text"><small class="text-muted">Aforo: ${sala.aforo}</small></p>
                <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${sala.id}">Reserva</a>
              </div>
            </div>
          </div>
          </div>
          `;
        const salaReserva = salaItem.querySelector(`#reserva-${sala.id}`);
        salaReserva.addEventListener("click", async (e2) => {
          console.log("Boton reservar");
          const salaReservaId = e2.target.id;
          const salaId = salaReservaId.replace("reserva-", "");
          swal("Desea reservar la sala?", {
            buttons: ["Cancelar", "Confirmar"]
          }).then(async (value) => {
            if (value) {
              await Salas.estado(salaId);
            } else {
              swal({ title: "Cancelado", icon: "warning" });
            }
          });
        });
        salaList.appendChild(salaItem);
      });
    });
  }
};
export {
  salas as default
};
