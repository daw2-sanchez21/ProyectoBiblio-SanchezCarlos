import "./claseLibros-c77c76e3.js";
import { S as Salas } from "./vistaSalas-656ca006.js";
import "./main-5054c098.js";
const editSala = {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Editar Sala</h2>
    <div class="m-3">
      <label class="form-label">Nombre:</label>
      <input type="text" class="form-control" id="nombre-id" pattern="[A-Za-z0-9 ]+" require>    
    </div>
    <div class="m-3">
      <label  class="form-label">Aforo:</label>
      <input type="text" class="form-control" id="aforo-id" pattern="[0-9]{1,}" require> 
    
    </div>
    <div class="m-3"
      <label class="form-label">Descripción:</label>
      <input type="text" class="form-control" id="descripcion-id" pattern="[A-Za-z0-9 ]+" require>
    </div>
    <div class="m-3">
      <label class="form-label">Imagen:</label>
      <input type="text" class="form-control" id="imagen-id"  pattern="https?://.+" require>
    </div>
    
    <button type="submit" class="btn btn-success m-3">Editar</button>
  </form></div></div></div></div></div>`,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.height = "1000px";
    const obtenerId = document.querySelector("#guardar-id");
    console.log("sala value id: ", obtenerId.value);
    const nombre = document.querySelector("#nombre-id");
    const aforo = document.querySelector("#aforo-id");
    const descripcion = document.querySelector("#descripcion-id");
    const imagen = document.querySelector("#imagen-id");
    const obtdatos = await Salas.getByID(obtenerId.value);
    nombre.value = obtdatos[0].nombre;
    aforo.value = obtdatos[0].aforo;
    descripcion.value = obtdatos[0].sala_descripcion;
    imagen.value = obtdatos[0].imagen;
    const form = document.querySelector("#form-id");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form2 = document.querySelector("form");
      const nombre2 = form2.querySelector("#nombre-id");
      const aforo2 = form2.querySelector("#aforo-id");
      const descripcion2 = form2.querySelector("#descripcion-id");
      const imagen2 = form2.querySelector("#imagen-id");
      const dataSala = {
        nombre: nombre2.value,
        aforo: aforo2.value,
        descripcion: descripcion2.value,
        imagen: imagen2.value,
        id: obtenerId.value
      };
      await Salas.updateSala(dataSala);
      window.location = "#/adminSalas";
    });
  }
};
export {
  editSala as default
};
