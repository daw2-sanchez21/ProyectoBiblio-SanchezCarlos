import { R as ReservaLibros, L as Libros } from "./claseLibros-c77c76e3.js";
import { R as ReservaSalas, S as Salas } from "./vistaSalas-656ca006.js";
import "./main-5054c098.js";
console.log("Conecciton done");
const reservas = {
  template: `
  <div class="container-fluid  d-flex justify-content-center align-items-center mt-5" id="video">
  <div class="container m-5 p-5">
    <div class="row d-flex align-items-center">
      <div class="col-5 border border-dark border-2 m-4 mx-auto align-self-center text-center justify-content-center rounded" style="background-color: #FFFFFF;" id="res-libros">
        <h2 class="border-bottom">Mis libros</h2>
      </div>
      <div class="col-5 border  border-dark border-2 m-4 mx-auto align-self-center text-center justify-content-center rounded" style="background-color: #FFFFFF;" id="res-salas">
        <h2 class="border-bottom">Mis salas</h2>
      </div>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-12 border  border-dark border-2 m-5 p-2 mx-auto align-self-center text-center rounded" style="background-color: #FFFFFF;" id="amonestaciones-id">
        <h2 class="border-bottom">Amonestaciones</h2>
        
      </div>
    </div>
  </div>
</div>


`,
  async script() {
    console.log("Reservas");
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.height = "auto";
    main.style.minHeight = "1000px";
    const res = document.querySelector("#res-libros");
    res.style.minHeight = "300px";
    const obtID = document.querySelector("#guardarUser-id");
    console.log("Este es el id busc", obtID.value);
    const reservaLibros = await ReservaLibros.getReservasByUserId(obtID.value);
    for (const reserva of reservaLibros) {
      const imgLibro = await Libros.getAllByID(reserva.id_libro);
      document.querySelector("#txt-reservas");
      const libroItem = document.createElement("div");
      if (reserva.estado === "Devuelto") {
        libroItem.innerHTML = `
          <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imgLibro[0].imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Número: #${reserva.id}</h5>
                <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva}</br> Fecha entrega:  ${reserva.fecha_entrega} </br> Estado: ${reserva.estado}</p>
                <a href="#" class="btn disabled" color:white" id="devolver-${reserva.id_libro}">Devolver</a>
              </div>
            </div>
          </div>
        </div>`;
      } else if (reserva.estado === "Pending") {
        libroItem.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${imgLibro[0].imagen}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Número: #${reserva.id}</h5>
                  <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva}</br> Fecha entrega:  ${reserva.fecha_entrega} </br> Estado: ${reserva.estado}</p>
                  <a href="#" class="btn disabled border border-warning" color:white" id="devolver-${reserva.id_libro}">Pending...</a>
                </div>
              </div>
            </div>
          </div>`;
      } else {
        libroItem.innerHTML = `
          <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imgLibro[0].imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Número: #${reserva.id}</h5>
                <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva}</br> Fecha entrega:  ${reserva.fecha_entrega} </br> Estado: ${reserva.estado}</p>
                <a href="#" class="btn btn-success" color:white" id="devolver-${reserva.id_libro}">Devolver</a>
              </div>
            </div>
          </div>
        </div>
          `;
      }
      const libroReserva = libroItem.querySelector(`#devolver-${reserva.id_libro}`);
      libroReserva.addEventListener("click", async (e) => {
        console.log("Boton reservar");
        const libroReservaId = e.target.id;
        const libroId = libroReservaId.replace("devolver-", "");
        swal("Desea devolver el libro?", {
          buttons: ["Cancelar", "Confirmar"]
        }).then(async (value) => {
          if (value) {
            await ReservaLibros.devolver(libroId, obtID.value);
            window.location = "#/reservas";
          } else {
            swal({ title: "Cancelado", icon: "warning" });
          }
        });
      });
      res.appendChild(libroItem);
    }
    const reSala = document.querySelector("#res-salas");
    reSala.style.minHeight = "300px";
    const reservaSalas = await ReservaSalas.getReservasByUserId(obtID.value);
    for (const reserva of reservaSalas) {
      const imgSala = await Salas.getByID(reserva.sala_id);
      const salaItem = document.createElement("div");
      salaItem.innerHTML = `
          <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imgSala[0].imagen}" style="height:100%; width:100%;" class="img-fluid rounded-start" alt="Imagen Libro">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Número: #${reserva.id}</h5>
                <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva} </br> Estado: ${reserva.estado}</p>
                <a href="#" class="btn btn-success" color:white" id="liberar-${reserva.sala_id}">Liberar</a>
              </div>
            </div>
            </div>
          </div>`;
      const salaReserva = salaItem.querySelector(`#liberar-${reserva.sala_id}`);
      salaReserva.addEventListener("click", async (e) => {
        console.log("Boton reservar");
        const salaReservaId = e.target.id;
        const salaId = salaReservaId.replace("liberar-", "");
        console.log("Este es el id de la sala: ", salaId);
        swal("Desea liberar la sala?", {
          buttons: ["Cancelar", "Confirmar"]
        }).then(async (value) => {
          if (value) {
            await ReservaSalas.liberar(salaId);
            window.location = "#/reservas";
          } else {
            swal({ title: "Cancelado", icon: "warning" });
          }
        });
      });
      reSala.appendChild(salaItem);
    }
    const amnt = document.querySelector("#amonestaciones-id");
    amnt.style.minHeight = "200px";
  }
};
export {
  reservas as default
};
