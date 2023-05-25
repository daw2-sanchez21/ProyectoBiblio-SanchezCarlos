import "./claseLibros-075f01ea.js";
import { S as Salas } from "./vistaSalas-d751a7a9.js";
import "./main-ee19579a.js";
const a_adirSala = {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Nueva Sala</h2>
    <div class="m-3">
      <label class="form-label">Nombre:</label>
      <input type="text" class="form-control" id="nombre-id" pattern="[A-Za-z0-9 ]+" require>    
    </div>
    <div class="m-3">
      <label  class="form-label">Aforo:</label>
      <input type="text" class="form-control" id="aforo-id" pattern="[0-9]{1,}">
    
    </div>
    <div class="m-3"
      <label class="form-label">Descripción:</label>
      <input type="text" class="form-control" id="descripcion-id" pattern="[A-Za-z0-9 ]+" require>
    </div>
    <div class="m-3">
      <label class="form-label">Imagen:</label>
      <input type="text" class="form-control" id="imagen-id" pattern="https?://.+" require>
    </div>
    
    <button type="submit" class="btn btn-success m-3">Añadir</button>
  </form></div></div></div></div></div>`,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.height = "1000px";
    const form = document.querySelector("#form-id");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form2 = document.querySelector("form");
      const nombre = form2.querySelector("#nombre-id");
      const aforo = form2.querySelector("#aforo-id");
      const descripcion = form2.querySelector("#descripcion-id");
      const imagen = form2.querySelector("#imagen-id");
      const dataSala = {
        nombre: nombre.value,
        aforo: aforo.value,
        descripcion: descripcion.value,
        imagen: imagen.value
      };
      await Salas.addSala(dataSala);
      window.location = "#/adminSalas";
    });
  }
};
export {
  a_adirSala as default
};
