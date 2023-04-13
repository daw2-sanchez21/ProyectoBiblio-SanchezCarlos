import { createClient } from '@supabase/supabase-js'
import { User } from './user'
import { Usuarios } from './usuarios'
export default {
  template: `<div class="container h-100" style="background-color:#3BC3FF">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Registro</h2>
    <div class="mb-3"
      <label for="exampleInputEmail1" class="form-label">Nombre:</label>
      <input type="text" class="form-control" id="nombre-id" aria-describedby="emailHelp">
    </div>
    <div class="mb-3"
      <label for="exampleInputEmail1" class="form-label">Apellido:</label>
      <input type="text" class="form-control" id="apellido-id" aria-describedby="emailHelp">
    </div>
    <div class="mb-3"
      <label for="exampleInputEmail1" class="form-label">Nick:</label>
      <input type="text" class="form-control" id="nick-id" aria-describedby="emailHelp">
    </div>
    <div class="mb-3"
      <label for="exampleInputEmail1" class="form-label">Email:</label>
      <input type="email" class="form-control" id="email-id" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password:</label>
      <input type="password" class="form-control" id="password-id">
    </div>
    
    <button type="submit" class="btn btn-primary">Sign Up</button>
  </form></div></div></div></div></div>`,

  async script() {
    console.log("connectio done");
    const main= document.querySelector('main')
    main.style.backgroundColor='#3BC3FF'
    main.style.height='1000px'
    
    const formUser = document.querySelector('#form-id')
    formUser.addEventListener('submit', async (e) => {
      e.preventDefault()
      const rol="default"
      try {
        // Objeto con datos para el registro de user
        const usuario = {
          email: document.querySelector('#email-id').value,
          password: document.querySelector('#password-id').value
        }
        const nuevoUser = await User.create(usuario)
      }catch(error){ console.log(error)
        alert('Error al crear usuario')}
        try{ const perfilData = {
          nombre: document.querySelector('#nombre-id').value,
          apellido: document.querySelector('#apellido-id').value,
          nick: document.querySelector('#nick-id').value,
          email: document.querySelector('#email-id').value,
          password: document.querySelector('#password-id').value,
          rol: rol
        }
        await Usuarios.create(perfilData)
        alert('Usuario creado con éxito')
        // Cargamos la página login
        window.location.href = '/#/login'
      }catch(error){ 
        console.log(error)
        alert('Error al crear usuario')
      }
      try{
        const user= document.querySelector('#email-id').value
        const id= await Usuarios.getId(user)
        console.log(id)
      }catch(error){ 
        console.log(error)
        alert('Error al obtener ID')}
    })
  }
}