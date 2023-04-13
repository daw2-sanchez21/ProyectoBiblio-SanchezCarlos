import { createClient } from '@supabase/supabase-js'
import { Libros } from './claseLibros.js'
export default {
  template: `
    <h1>Lista de Libros</h1>
    <div class="container">
      <form id="search-id" class="d-flex p-5">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
        <button class="btn" style="border-color:#77B7E1;" type="submit">Search</button>
      </form>
    </div>
    <div class="container" id="libros-list"></div>
  `,
  async script() {
    
    const main= document.querySelector('main')
    main.style.backgroundColor='#FFFFFF'
    main.style.height='auto'

    const librosList = document.createElement('div');
    librosList.classList.add('row');

        const libros = await Libros.getAll()
        libros.forEach((libro) => {
          const libroItem = document.createElement('div');
          libroItem.classList.add('card', 'col-3', 'p-3', 'm-3');
          libroItem.style.width = '18rem';
          libroItem.innerHTML = `
            <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo} style="width: 200px; height: 220px;">
            <div class="card-body">
              <h5 class="card-title">${libro.titulo}</h5>
              <p class="card-text">${libro.autor}</p>
              <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro.id}">Reserva</a>
            </div>
          `; 
          const libroReserva = libroItem.querySelector(`#reserva-${libro.id}`)
          libroReserva.addEventListener('click', async(e)=>{
            console.log("Boton reservar")
            const libroReservaId = e.target.id
            const libroId = libroReservaId.replace("reserva-", "");
            let { data, error } = await supabase //Proxima clase
            .from('reserva_libros')
            .select('estado')
            .eq('id', `${libroId}`)

            if(data[0].estado=="reservado"){
              //Mejorar alert para cuando el libro no esté disponible
              alert("El libro ya está reservado");
            }else{
              console.log("Disponible")
            }
           })
          librosList.appendChild(libroItem);
        })

        // Agregamos la lista de libros al elemento HTML con el ID "libros-list"
        const librosListContainer = document.getElementById('libros-list')
        librosListContainer.appendChild(librosList)
      
      //FILTRO SEARCH
       const formsearch = document.querySelector('#search-id')
          formsearch.addEventListener('submit', async(e)=>{
            e.preventDefault();
            const texto =e.target.search.value
            const { data: libros, error } = await supabase
            .from('libros')
            .select('*')
            .ilike('titulo', `%${texto}%`)
          
          if (error) {
            console.log(error)
          } else {
            console.log(libros)
          
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
                  <a href="#" class="btn" style="background-color:#00AF87;" id="reserva-${libro.id}">Reserva</a>
                </div>    
              `;
          
              librosList.appendChild(nuevoLibro)
            });
            }

          })
  },
};