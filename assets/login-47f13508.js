import { h as header, U as User } from "./main-f8b5675b.js";
const login = {
  template: `<div class="container h-100">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
        <h2 class="mb-3" style="font-family: 'Open Sans', sans-serif;">Inicio de sesión</h2>
  <form id="form-id">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"><span style="font-family: 'Open Sans', sans-serif;">Email:</span></label>
      <input type="email" class="form-control" id="email-id" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"><span style="font-family: 'Open Sans', sans-serif;">Contraseña:</span></label>
      <input type="password" class="form-control" id="password-id">
    </div>
    <div class="row">
      <div class="col-4">
        <button type="submit" class="btn" style="border-color:#77B7E1; font-family: 'Open Sans', sans-serif;">Entrar</button>
      </div>
      <div class="col-8">
        <a class="nav-link mt-1" href="#/registro"><span style="color:#000000; font-size:16px; font-family: 'Open Sans', sans-serif; text-decoration: underline;">Registro</span></a>
      </div>
        </div>
  </form></div>
  </div></div></div></div>`,
  async script() {
    header.script();
    console.log("pruebas supabase");
    const main = document.querySelector("main");
    main.style.backgroundColor = "#77B7E1";
    main.style.height = "1000px";
    const formLogin = document.querySelector("#form-id");
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const userData = {
          email: document.querySelector("#email-id").value,
          password: document.querySelector("#password-id").value
        };
        const usuarioLogeado = await User.login(userData);
        console.log("Logueado");
        window.location.href = "/#/libros";
        header.script();
      } catch (error) {
        swal({ title: "Error", text: "Las credenciales no son correcta o no estás registrado correctamente", icon: "warning" });
      }
    });
  }
};
export {
  login as default
};
