import "./claseLibros-f015239d.js";
import { a as Usuarios } from "./main-ea9e3bc0.js";
const editUsuario = {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Editar Usuario</h2>
    <div class="m-3">
      <label class="form-label">Nombre: </label>
      <input type="text" class="form-control" id="nombre-id" require>    
    </div>
    <div class="m-3">
      <label class="form-label">Apellido: </label>
      <input type="text" class="form-control" id="apellido-id" require>    
    </div>
    <div class="m-3">
      <label  class="form-label">Nick: </label>
      <input type="text" class="form-control" id="nick-id"  require>
    </div>
    <button type="submit" class="btn btn-success m-3">Editar</button>
  </form></div></div></div></div></div>`,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.height = "1000px";
    const obtenerId = document.querySelector("#guardar-id");
    console.log(obtenerId.value);
    const form = document.querySelector("#form-id");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form2 = document.querySelector("form");
      const nombre = form2.querySelector("#nombre-id");
      const apellido = form2.querySelector("#apellido-id");
      const nick = form2.querySelector("#nick-id");
      const dataLibro = {
        id: obtenerId.value,
        nombre: nombre.value,
        apellido: apellido.value,
        nick: nick.value
      };
      await Usuarios.editar(dataLibro);
      window.location = "#/adminUser";
    });
  }
};
export {
  editUsuario as default
};
