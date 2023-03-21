import { createClient } from '@supabase/supabase-js'

export const login = {
  template: `<div class="container h-100" style="background-color:#3BC3FF">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
        <h2 class="mb-3">Registro</h2>
  <form id="form-id">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email:</label>
      <input type="email" class="form-control" id="email-id" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password:</label>
      <input type="password" class="form-control" id="password-id">
    </div>
    
    <button type="submit" class="btn btn-primary">Login</button>
  </form></div>
  </div></div></div></div>`,
  async script() {
    console.log('pruebas supabase');
    // Creando la conexión con Supabase
    const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA';
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Conecciton done");
    const main= document.querySelector('main')
    main.style.backgroundColor='#3BC3FF'
    main.style.height='1000px'
    const formLogin = document.querySelector('#form-id')
    formLogin.addEventListener('submit', async(e)=>{
      e.preventDefault()
      const emailID = document.getElementById('email-id')
      const pswID = document.getElementById('password-id')
      console.log(emailID.value);
      console.log(pswID.value);
     
       
    let { data, error } = await supabase.auth.signInWithPassword({
      email: `${emailID.value}`,
      password: `${pswID.value}`
    })
    if (error) {
      console.log(error)
    } else { console.log('Usuario logeado') }

      
    })
  
  },
}
