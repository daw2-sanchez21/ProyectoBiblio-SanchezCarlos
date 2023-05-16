import { L as Libros } from "./claseLibros-d15c9d53.js";
import "./main-300f7e38.js";
const descripcionLibros = {
  template: `
    <h1>Descripción Libro</h1>
    <div class="container" id="libro-cont"></div>
  `,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.height = "1000px";
    const recId = document.querySelector("#guardar-id");
    const libro = await Libros.getAllByID(recId.value);
    const contLibro = document.querySelector("#libro-cont");
    const libroItem = document.createElement("div");
    libroItem.classList.add("card", "col-3", "p-3", "m-3");
    libroItem.style.width = "18rem";
    libroItem.innerHTML = `
      <img src="${libro[0].imagen}" id="img-${libro[0].id}" class="card-img-top" alt="${libro[0].titulo} style="width: 200px; height: 220px;">
      <div class="card-body">
        <h5 class="card-title">${libro[0].titulo}</h5>
        <p class="card-text">${libro[0].autor}</p>
        <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro[0].id}">Reserva</a>
      </div>`;
    contLibro.appendChild(libroItem);
  }
};
export {
  descripcionLibros as default
};
