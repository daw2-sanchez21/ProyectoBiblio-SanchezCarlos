import { User } from '../vistas/user'
import { Usuarios } from '../vistas/usuarios'
export const header = {
  template: `<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div class="container">
    <a class="navbar-brand biblio" href="#"><span class="text-dark" style="font-size:24px">Biblioteca</span><span style="color:#77B7E1; font-size:24px;">Llefià</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0" id="hd">

      </ul>
    </div>
  </div>
</nav><div id="guardar-id"></div>`,
  async script (){
    console.log('header')
    const nav = document.querySelector("#hd")
    nav.innerHTML=``
    nav.innerHTML=`
            <li class="nav-item">
              <a class="nav-link" href="#/login"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Login</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/registro"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Registre</span></a>
            </li>
         `
    //Hacer lógica más eficiente y probar en incognito pq guarda los usuarios
    const estado = await User.getUser()
    //console.log("USUERE", estado.email)
    const obtRol = await Usuarios.getByUserRol(estado.email)
    console.log("ROLERO", obtRol.rol)
    console.log(estado)
      if(obtRol.rol === "default"){
        nav.innerHTML=``
        nav.innerHTML=`
            <li class="nav-item">
              <a class="nav-link" href="#/home"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Inici</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/libros"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Llibres</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/salas"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Sales</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/reservas"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Reserves</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/logout"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">LogOut</span></a>
            </li>
            
            `
      }else if(obtRol.rol === "admin"){
        nav.innerHTML=``
        nav.innerHTML=`
        <li class="nav-item">
          <a class="nav-link" href="#/home"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Inici</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/libros"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Llibres</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/salas"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Sales</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/reservas"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Reserves</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#/admin"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Admin Libros</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#/adminSalas"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Admin Salas</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/logout"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">LogOut</span></a>
        </li>
        
        `
    }else{
      nav.innerHTML=``
      nav.innerHTML=`
            <li class="nav-item">
              <a class="nav-link" href="#/login"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Login</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/registro"><span style="color:#000000; font-size:18px; font-family: 'Open Sans', sans-serif;">Registre</span></a>
            </li>
         `
    }
    
}
}