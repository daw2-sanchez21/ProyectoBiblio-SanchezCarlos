import { createClient } from '@supabase/supabase-js'
import { User } from './user'
import { header } from '../componentes/header';

export default  {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
        <h2 class="mb-3" style="font-family: 'Open Sans', sans-serif;">Login</h2>
  <form id="form-id">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"><span style="font-family: 'Open Sans', sans-serif;">Email:</span></label>
      <input type="email" class="form-control" id="email-id" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"><span style="font-family: 'Open Sans', sans-serif;">Contrasenya:</span></label>
      <input type="password" class="form-control" id="password-id">
    </div>
    
    <button type="submit" class="btn" style="border-color:#77B7E1; font-family: 'Open Sans', sans-serif;">Entrar</button>
  </form></div>
  </div></div></div></div>`,
  async script() {
    console.log('pruebas supabase');
    const main= document.querySelector('main')
    main.style.backgroundColor='#77B7E1'
    main.style.height='1000px'
    const formLogin = document.querySelector('#form-id')
    formLogin.addEventListener('submit', async(e)=>{
      e.preventDefault()
      e.stopPropagation()
      try{
        const userData = {
          email: document.querySelector('#email-id').value,
          password: document.querySelector('#password-id').value
        }

       // Intentamos loguearnos utilizando el método login de nuestra clase User
       const usuarioLogeado = await User.login(userData)
       console.log("Logueado")
       window.location.href = '/#/libros'
       header.script()
      }catch (error) {
        alert('No se ha podido iniciar sesión ' + error)
      }
       
    

      
    })
  
  },
}
