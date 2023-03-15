import { createClient } from '@supabase/supabase-js'


export const login = {
    template: `<h1>Pruebas Supabase</h1><form id="login-form">
    <label for="email">Correo electrónico:</label>
    <input type="email" id="email" name="email" required>
  
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" required>
  
    <button type="submit">Iniciar sesión</button>
  </form>`,
    script: ()=>{
        console.log('purebas supabase');
        const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA'
        const supabase = createClient(supabaseUrl, supabaseKey)
        console.log(supabase);
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', handleLogin);

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, user } = await supabase.auth.signIn({
    email,
    password
  });

  if (error) {
    console.error(error);
  } else {
    console.log('Inicio de sesión exitoso:', user);
    // redireccionar al usuario a la página de inicio después del inicio de sesión exitoso
  }
}

    }
}