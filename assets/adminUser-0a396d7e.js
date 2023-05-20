import "./claseLibros-c43a2a6c.js";
import { a as Usuarios } from "./main-0bcf348b.js";
const adminUser = {
  template: `
    <h1>Lista de Usuarios</h1>
    <div class="container" id="user-list">
    <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Nick</th>
        <th scope="col">Email</th>
        <th scope="col">Rol</th>
        <th scope="col">Bloquear</th>
        <th scope="col">Editar</th>
      </tr>
    </thead>
    <tbody id="tabla">

    </tbody>
    </div>
  `,
  async script() {
    const usuarios = await Usuarios.getAll();
    const main = document.querySelector("main");
    main.style.backgroundColor = "#FFFFFF";
    main.style.backgroundImage = 'url("")';
    main.style.height = "auto";
    const insTabla = document.querySelector("#tabla");
    usuarios.forEach((usuario) => {
      const usuarioItem = document.createElement("tr");
      usuarioItem.innerHTML = `
      <th scope="row">${usuario.id}</th>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.nick}</td>
      <td>${usuario.email}</td>
      <td>${usuario.rol}</td>
      <td><a href="#" class="btn btn-danger" color:white" id="eliminar-${usuario.id}">Eliminar</a></td>
      <td><a href="#" class="btn btn-warning" color:white" id="editar-${usuario.id}">Editar</a></td>
        `;
      const userEliminar = usuarioItem.querySelector(`#eliminar-${usuario.id}`);
      userEliminar.addEventListener("click", async (e) => {
        console.log("Boton eliminar");
        const userEliminarId = e.target.id;
        const userId = userEliminarId.replace("eliminar-", "");
        swal("Desea eliminar el usuario?", {
          buttons: ["Cancelar", "Confirmar"]
        }).then(async (value) => {
          if (value) {
            await Usuarios.bloquear(userId);
            window.location = "#/adminUser";
          } else {
            swal({ title: "Cancelado", icon: "warning" });
          }
        });
        const usuarioEdit = usuarioItem.querySelector(`#editar-${usuario.id}`);
        usuarioEdit.addEventListener("click", async (e2) => {
          const usuarioEditId = e2.target.id;
          const usuarioId = usuarioEditId.replace("editar-", "");
          const guardarId = document.querySelector("#guardar-id");
          guardarId.value = usuarioId;
          window.location = "#/editUser";
        });
      });
      insTabla.appendChild(usuarioItem);
    });
  }
};
export {
  adminUser as default
};
