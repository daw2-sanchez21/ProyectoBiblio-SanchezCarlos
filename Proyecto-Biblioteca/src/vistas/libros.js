import { createClient } from '@supabase/supabase-js';

export default {
  template: `
    <h1>Lista de Libros</h1>
    <div class="container">
      <form id="search-id" class="d-flex p-5">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    <div class="container" id="libros-list"></div>
  `,
  async script() {
    console.log('pruebas supabase');
    // Creando la conexión con Supabase
    const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const main= document.querySelector('main')
    main.style.backgroundColor='#FFFFFF'
    main.style.height='auto'

    const librosList = document.createElement('div');
    librosList.classList.add('row');

    supabase
      .from('libros')
      .select('id, titulo, autor, imagen')
      .then(({ data: libros, error }) => {
        if (error) {
          console.error(error);
          return;
        }


        libros.forEach((libro) => {
          const libroItem = document.createElement('div');
          libroItem.classList.add('card', 'col-3', 'p-3', 'm-3');
          libroItem.style.width = '18rem';
          libroItem.innerHTML = `
            <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo} style="width: 200px; height: 220px;">
            <div class="card-body">
              <h5 class="card-title">${libro.titulo}</h5>
              <p class="card-text">${libro.autor}</p>
              <a href="#" class="btn btn-primary" id="reserva-${libro.id}">Reserva</a>
            </div>
          `; 
          const libroReserva = libroItem.querySelector(`#reserva-${libro.id}`)
          libroReserva.addEventListener('click', async(e)=>{
            console.log("Boton reservar")
            const libroReservaId = e.target.id
            const libroId = libroReservaId.replace("reserva-", "");
            let { data, error } = await supabase
            .from('reserva_libros')
            .select('estado')
            .eq('id', `${libroId}`)

            if(data[0].estado=="reservado"){
              //Mejorar alert para cuando el libro no esté disponible
              alert("El libro ya está reservado");
            }else{
              console.log("Disponible")
              //Tendremos que optener el usuario
              //const { data: { user } } = await supabase.auth.getUser()

              //const { data, error } = await supabase
              //.from('reserva_libros')
              //.update({ somevalue: 'otherValue' })
              //.eq('some_column', 'someValue')

            }
 

           })
           
          librosList.appendChild(libroItem);
        });

        // Agregamos la lista de libros al elemento HTML con el ID "libros-list"
        const librosListContainer = document.getElementById('libros-list');
        librosListContainer.appendChild(librosList);
      });
      //FILTRO SEARCH
       const formsearch = document.querySelector('#search-id')
          formsearch.addEventListener('submit', async(e)=>{
            e.preventDefault();
            const texto =e.target.search.value
            const { data: libros, error } = await supabase
            .from('libros')
            .select('*')
            .ilike('titulo', `%${texto}%`);
          
          if (error) {
            console.log(error);
          } else {
            console.log(libros);
          
            librosList.innerHTML = "";
          
            libros.forEach((libro) => {
              const nuevoLibro = document.createElement('div');
              nuevoLibro.classList.add('card', 'col-3', 'p-3', 'm-3');
              nuevoLibro.style.width = '18rem';
              
              nuevoLibro.innerHTML = `
                <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo} style="width: 200px; height: 220px;">
                <div class="card-body">
                  <h5 class="card-title">${libro.titulo}</h5>
                  <p class="card-text">${libro.autor}</p>
                  <a href="#" class="btn btn-primary" id="reserva-${libro.id}">Reserva</a>
                </div>    
              `;
          
              librosList.appendChild(nuevoLibro)
            });
            }

          })

          


  },
};