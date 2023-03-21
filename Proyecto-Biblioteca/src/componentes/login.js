import { createClient } from '@supabase/supabase-js'

export const login = {
  template: `<div class="container"><form id="form-id">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email-id" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="password-id">
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
  </form></div>`,
  async script() {
    console.log('pruebas supabase');
    // Creando la conexión con Supabase
    const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA';
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Conecciton done");
    
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
