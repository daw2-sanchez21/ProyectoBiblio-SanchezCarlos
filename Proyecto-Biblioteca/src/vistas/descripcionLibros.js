import { createClient } from '@supabase/supabase-js'
import { Libros } from './claseLibros.js'
import { supabase } from './supabase'
import { ReservaLibros } from './claseReservaLibros';
export default {
  template: `
    <h1>Descripción Libro</h1>
    <div class="container" id="libro-cont"></div>
  `,
  async script() {
    const main= document.querySelector('main')
    main.style.backgroundColor='#77B7E1'
    main.style.height='auto'

    const recId = document.querySelector('#guardar-id')
    const libro = await Libros.getAllByID(recId.value)
    //console.log("Este es el tituoloo: ", libro[0].titulo)
    const contLibro = document.querySelector('#libro-cont')
    const libroItem = document.createElement('div')
    libroItem.classList.add('card', 'col-3', 'p-3', 'm-3')
    libroItem.style.width = '18rem'
    //Modificar html 
    libroItem.innerHTML = `
      <img src="${libro[0].imagen}" id="img-${libro[0].id}" class="card-img-top" alt="${libro[0].titulo} style="width: 200px; height: 220px;">
      <div class="card-body">
        <h5 class="card-title">${libro[0].titulo}</h5>
        <p class="card-text">${libro[0].autor}</p>
        <a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro[0].id}">Reserva</a>
      </div>`

    //GetallbyId y añadir descripcion 
    //LogOUT!!!!!!
    contLibro.appendChild(libroItem)
  }
}