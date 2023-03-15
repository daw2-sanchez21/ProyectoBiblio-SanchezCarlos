import { createClient } from '@supabase/supabase-js';

export const salas = {
  template: `
    <h1>Lista de salas</h1>
    <div class="container">
      <form id="search-id-sala" class="d-flex p-5">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchSala">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    <div class="container" id="sala-list"></div>
  `,
  async script() {
    console.log('pruebas supabase');
    // Creando la conexión con Supabase
    const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const salaList = document.createElement('div');
    salaList.classList.add('row');

    supabase
      .from('salas')
      .select('id, nombre, aforo, sala_descripcion, imagen')
      .then(({ data: salas, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        salas.forEach((sala) => {
          const salaItem = document.createElement('div');
          
         
          salaItem.innerHTML = `
          <div class="card p-3 m-3 container-fluid">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${sala.imagen}" class="img-fluid rounded-start" alt="${sala.nombre}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${sala.nombre}</h5>
                <p class="card-text">${sala.sala_descripcion}</p>
                <p class="card-text"><small class="text-muted">Aforo: ${sala.aforo}</small></p>
                <a href="#" class="btn btn-primary">Reserva</a>
              </div>
            </div>
          </div>
        </div>
          `;
          salaList.appendChild(salaItem);
        });

        // Agregamos la lista de libros al elemento HTML con el ID "libros-list"
        const salaListContainer = document.getElementById('sala-list');
        salaListContainer.appendChild(salaList);
      });
      //FILTRO SEARCH
       const formsearch = document.querySelector('#search-id-sala')
          formsearch.addEventListener('submit', async(e)=>{
            e.preventDefault();
            const texto =e.target.searchSala.value
            const { data: salas, error } = await supabase
            .from('salas')
            .select('*')
            .ilike('nombre', `%${texto}%`);
          
          if (error) {
            console.log(error);
          } else {
            console.log(salas);
          
            salaList.innerHTML = "";
          
            salas.forEach((sala) => {
              const nuevaSala = document.createElement('div');
             
              
              nuevaSala.innerHTML = `
              <div class="card p-3 m-3 container-fluid">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${sala.imagen}" class="img-fluid rounded-start" alt="${sala.nombre}">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${sala.nombre}</h5>
                    <p class="card-text">${sala.sala_descripcion}</p>
                    <p class="card-text"><small class="text-muted">Aforo: ${sala.aforo}</small></p>
                    <a href="#" class="btn btn-primary">Reserva</a>
                  </div>
                </div>
              </div>
            </div>  
              `;
          
              salaList.appendChild(nuevaSala);
            });
            }

          })



  },
};
