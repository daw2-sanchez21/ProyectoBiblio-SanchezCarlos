import { U as User, a as Usuarios } from "./main-5054c098.js";
const registro = {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Registro</h2>
    <div class="m-3"
      <label for="exampleInputEmail1" class="form-label">Nombre:</label>
      <input type="text" class="form-control" id="nombre-id" pattern="[A-Za-z ]+"  required>
      
    </div>
    <div class="m-3"
      <label for="exampleInputEmail1" class="form-label">Apellido:</label>
      <input type="text" class="form-control" id="apellido-id" pattern="[A-Za-z ]+"  required>
      <div class="invalid-feedback">El apellido no es correcto</div>
    </div>
    <div class="m-3"
      <label for="exampleInputEmail1" class="form-label">Nick:</label>
      <input type="text" class="form-control" id="nick-id" pattern="[A-Za-z0-9]+" required>
    </div>
    <div class="m-3"
      <label for="exampleInputEmail1" class="form-label">Email:</label>
      <input type="email" class="form-control" id="email-id"  required />
      <div class="invalid-feedback">El Email no es correcto</div>
    </div>
    <div class="m-3">
      <label for="exampleInputPassword1" class="form-label">Password:</label></br>
      <small class="form-text text-muted">La contraseña debe contener 8 caracteres y números.</small>
      <input type="password" class="form-control" id="password-id" pattern="[A-Za-z0-9]+" required >
      <div class="invalid-feedback">
                La contraseña debe contener 8 letras o números.
            </div>
    </div>
    <button type="submit" class="btn m-3" style="border-color:#77B7E1; font-family: 'Open Sans', sans-serif;">Registrar</button>
  </form></div></div></div></div></div>`,
  async script() {
    console.log("connectio done");
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.height = "1000px";
    const formUser = document.querySelector("#form-id");
    formUser.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rol = "default";
      try {
        const usuario = {
          email: document.querySelector("#email-id").value,
          password: document.querySelector("#password-id").value
        };
        const nuevoUser = await User.create(usuario);
      } catch (error) {
        console.log(error);
        swal({ title: "Error al crear el usuario", icon: "warning" });
      }
      try {
        const perfilData = {
          nombre: document.querySelector("#nombre-id").value,
          apellido: document.querySelector("#apellido-id").value,
          nick: document.querySelector("#nick-id").value,
          email: document.querySelector("#email-id").value,
          password: document.querySelector("#password-id").value,
          rol
        };
        await Usuarios.create(perfilData);
      } catch (error) {
        console.log(error);
      }
      try {
        const user = document.querySelector("#email-id").value;
        const id = await Usuarios.getId(user);
        console.log(id);
      } catch (error) {
        console.log(error);
        alert("Error al obtener ID");
      }
    });
  }
};
export {
  registro as default
};
