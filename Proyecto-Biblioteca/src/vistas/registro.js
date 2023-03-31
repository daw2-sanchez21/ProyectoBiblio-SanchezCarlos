import { createClient } from '@supabase/supabase-js'

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
      <label for="exampleInputEmail1" class="form-label">Edad:</label>
      <input type="numeric" class="form-control" id="edad-id" aria-describedby="emailHelp">
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
    // Creando la conexión con Supabase
    const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA';
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log("connectio done");

    const main= document.querySelector('main')
    main.style.backgroundColor='#3BC3FF'
    main.style.height='1000px'
    
    const formUser = document.querySelector('#form-id')
    formUser.addEventListener('submit', async (e) => {
      e.preventDefault()
      const emailID = document.getElementById('email-id')
      const pswID = document.getElementById('password-id')
      const nombreID = document.getElementById('nombre-id')
      const apellidoID = document.getElementById('apellido-id')
      const nickID = document.getElementById('nick-id')
      const edadID = document.getElementById('edad-id')
    
    
      console.log(emailID.value)
      console.log(pswID.value)

    const { data, error } = await supabase.auth.signUp({
    email: `${emailID.value}`,
    password: `${pswID.value}`
    })
    if (error) {
    console.log(error)
  } else { 
    const { da, error } = await supabase
    .from('usuarios')
    .insert([{ nombre: `${nombreID.value}`, apellido: `${apellidoID.value}` ,nick: `${nickID.value}`, email: `${emailID.value}`, password: `${pswID.value}`, rol: 'default', edad: `${edadID.value}` }

  ])    
   if(error){console.log(error)}else{console.log(da)}}
})
}
}

