import { createClient } from '@supabase/supabase-js';

export default {
  template: `<div class="container m-5">
  <h1>Reservas</h1>
  <div class="row">
    <div class="col-6 border">
      <h2 class="border-bottom">Mis libros</h2>
    </div>
    <div class="col-6 border">
    <h2 class="border-bottom">Mis salas</h2>
    </div>
  </div></div>`,

  async script (){
    console.log('Reservas')
    const main= document.querySelector('main')
    main.style.backgroundColor='#E24320'
  }
  
  
}