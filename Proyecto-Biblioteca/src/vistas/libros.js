import { createClient } from '@supabase/supabase-js'
import { Libros } from './claseLibros.js'
import { supabase } from './supabase'
import { ReservaLibros } from './claseReservaLibros';
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

    const librosList = document.createElement('div')
    librosList.classList.add('row')

        const libros = await Libros.getAll()
        libros.forEach((libro) => {
          const libroItem = document.createElement('div')
          libroItem.classList.add('card', 'col-3', 'p-3', 'm-3')
          libroItem.style.width = '18rem'
          libroItem.innerHTML = `
            <img src="${libro.imagen}" id="img-${libro.id}" class="card-img-top" alt="${libro.titulo} style="width: 200px; height: 220px;">
            <div class="card-body">
              <h5 class="card-title">${libro.titulo}</h5>
              <p class="card-text">${libro.autor}</p>
              <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro.id}">Reserva</a>
            </div>`
          
          const imagen = libroItem.querySelector(`#img-${libro.id}`)
          imagen.addEventListener('click', async(e)=>{
            const imagenId = e.target.id
            const nuevoId = imagenId.replace("img-", "")
            const guardarId= document.querySelector('#guardar-id')
            guardarId.value = nuevoId
            window.location = '#/descripcion'
          })

          const libroReserva = libroItem.querySelector(`#reserva-${libro.id}`)
          libroReserva.addEventListener('click', async(e)=>{
            console.log("Boton reservar")
            const libroReservaId = e.target.id
            const libroId = libroReservaId.replace("reserva-", "")
            //Conflicto pq si no tiene estado da error
            //const confirmacion = window.confirm("¿Estás seguro de que quieres reservar este libro?");
            swal("Desea reservar el libro?",{
                buttons:["Cancelar", "Confirmar"]
            })
            .then(async(value) => {
              if (value) {
                //swal({title:'Confirmado', icon:'success'})
                await ReservaLibros.estado(libroId)
              } else {
                swal({title:'Cancelado', icon:'warning'})
                //console.log("Has hecho clic en el botón Cancelar");
              }
            })
            //if (confirmacion) {
            //await Libros.estado(libroId)
            //}
            
           })
          librosList.appendChild(libroItem)
        })

        // Agregamos la lista de libros al elemento HTML con el ID "libros-list"
        const librosListContainer = document.getElementById('libros-list')
        librosListContainer.appendChild(librosList)
      
      //FILTRO SEARCH
       const formsearch = document.querySelector('#search-id')
          formsearch.addEventListener('submit', async(e)=>{
            e.preventDefault();
            const texto =e.target.search.value
            const librosSearch = await Libros.getSearch(texto)
            librosList.innerHTML = ""
          
            librosSearch.forEach((libro2) => {
              const nuevoLibro = document.createElement('div');
              nuevoLibro.classList.add('card', 'col-3', 'p-3', 'm-3');
              nuevoLibro.style.width = '18rem'
              
              nuevoLibro.innerHTML = `
                <img src="${libro2.imagen}" class="card-img-top" alt="${libro2.titulo} style="width: 200px; height: 220px;">
                <div class="card-body">
                  <h5 class="card-title">${libro2.titulo}</h5>
                  <p class="card-text">${libro2.autor}</p>
                  <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro2.id}">Reserva</a>
                </div>    
              `
              //
              const libroReserva = nuevoLibro.querySelector(`#reserva-${libro2.id}`)
              libroReserva.addEventListener('click', async(e)=>{
                console.log("Boton reservar")
                const libroReservaId = e.target.id
                const libroId = libroReservaId.replace("reserva-", "")
                //Conflicto pq si no tiene estado da error
                //const confirmacion = window.confirm("¿Estás seguro de que quieres reservar este libro?");
                swal("Desea reservar el libro?",{
                    buttons:["Cancelar", "Confirmar"]
                })
                .then(async(value) => {
                  if (value) {
                    //swal({title:'Confirmado', icon:'success'})
                    await ReservaLibros.estado(libroId)
                  } else {
                    swal({title:'Cancelado', icon:'warning'})
                    //console.log("Has hecho clic en el botón Cancelar");
                  }
                })
                //if (confirmacion) {
                //await Libros.estado(libroId)
                //}
                
               })
              //
              librosList.appendChild(nuevoLibro)
            })
            

          })
  }
}