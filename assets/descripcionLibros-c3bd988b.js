import { L as Libros, R as ReservaLibros } from "./claseLibros-075f01ea.js";
import "./main-ee19579a.js";
const descripcionLibros = {
  template: `
    <h1>Descripción Libro</h1>
    <div class="container mt-5" id="libro-cont"></div>
  `,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#FFFFF";
    main.style.height = "1000px";
    const recId = document.querySelector("#guardar-id");
    const libro = await Libros.getAllByID(recId.value);
    const contLibro = document.querySelector("#libro-cont");
    const libroItem = document.createElement("div");
    libroItem.classList.add("row", "mt-5", "d-flex", "align-items-center", "justify-content-center");
    libroItem.innerHTML = `
      <div class="col-12 m-2 "><img src="${libro[0].imagen}" id="img-${libro[0].id}"  alt="${libro[0].titulo}" style="width: 200px; height: 300px;"></div>
        <div class="col-12 m-2 border-bottom"><h5 class="card-title"><strong>Titulo:</strong> ${libro[0].titulo}</h5></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>Autor:</strong> ${libro[0].autor}</p></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>Descripción: </strong> ${libro[0].descripcion}</p></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>Fecha de publicación: </strong> ${libro[0].fecha_publicacion}</p></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>ISBN:</strong> ${libro[0].isbn}</p></div>
        <div class="col-12 m-2"><a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro[0].id}">Reserva</a></div>
      </div>`;
    const libroReserva = libroItem.querySelector(`#reserva-${libro[0].id}`);
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
    contLibro.appendChild(libroItem);
  }
};
export {
  descripcionLibros as default
};
