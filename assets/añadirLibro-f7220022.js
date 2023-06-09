import { L as Libros } from "./claseLibros-1dfbca85.js";
import "./main-f8b5675b.js";
const a_adirLibro = {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Nuevo libro</h2>
    <div class="m-3">
      <label class="form-label">Titulo:</label>
      <input type="text" class="form-control" id="titulo-id" pattern="[A-Za-z0-9 ]+" require>    
    </div>
    <div class="m-3">
      <label  class="form-label">Autor:</label>
      <input type="text" class="form-control" id="autor-id" pattern="[A-Za-z0-9 ]+" require>
    
    </div>
    <div class="m-3"
      <label class="form-label">Isbn:</label>
      <input type="text" class="form-control" id="isbn-id" pattern="[A-Za-z0-9]+" require>
    </div>
    <div class="m-3">
      <label  class="form-label">Fecha publicación:</label>
      <input type="date" class="form-control" id="fecha-id" require>
    </div>
    <div class="m-3">
      <label for="exampleInputPassword1" class="form-label">Imagen:</label>
      <input type="text" class="form-control" id="imagen-id"  pattern="https?://.+" require>
    </div>
    
    <button type="submit" class="btn btn-success m-3">Añadir</button>
  </form></div></div></div></div></div>`,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.backgroundImage = 'url("")';
    main.style.height = "1000px";
    const form = document.querySelector("#form-id");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form2 = document.querySelector("form");
      const titulo = form2.querySelector("#titulo-id");
      const autor = form2.querySelector("#autor-id");
      const isbn = form2.querySelector("#isbn-id");
      const fecha = form2.querySelector("#fecha-id");
      const imagen = form2.querySelector("#imagen-id");
      const dataLibro = {
        titulo: titulo.value,
        autor: autor.value,
        isbn: isbn.value,
        fecha: fecha.value,
        imagen: imagen.value
      };
      await Libros.addLibro(dataLibro);
      window.location = "#/admin";
    });
  }
};
export {
  a_adirLibro as default
};
