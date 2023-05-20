import { createClient } from '@supabase/supabase-js'
import { Libros } from './claseLibros.js'
import { supabase } from './supabase'
import { ReservaLibros } from './claseReservaLibros';
export default {
  template: `
    <h1>Descripción Libro</h1>
    <div class="container mt-5" id="libro-cont"></div>
  `,
  async script() {
    const main= document.querySelector('main')
    main.style.backgroundColor='#FFFFF'
    main.style.height='1000px'

    const recId = document.querySelector('#guardar-id')
    const libro = await Libros.getAllByID(recId.value)
    //console.log("Este es el tituoloo: ", libro[0].titulo)
    const contLibro = document.querySelector('#libro-cont')
    const libroItem = document.createElement('div')
    libroItem.classList.add('row', 'mt-5','d-flex', 'align-items-center', 'justify-content-center')
    //libroItem.style.width = '18rem'
    //Modificar html 
    libroItem.innerHTML = `
      <div class="col-12 m-2 "><img src="${libro[0].imagen}" id="img-${libro[0].id}"  alt="${libro[0].titulo}" style="width: 200px; height: 300px;"></div>
        <div class="col-12 m-2 border-bottom"><h5 class="card-title"><strong>Titulo:</strong> ${libro[0].titulo}</h5></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>Autor:</strong> ${libro[0].autor}</p></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>Descripción: </strong> ${libro[0].descripcion}</p></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>Fecha de publicación: </strong> ${libro[0].fecha_publicacion}</p></div>
        <div class="col-12 m-2 border-bottom"><p class="card-text"><strong>ISBN:</strong> ${libro[0].isbn}</p></div>
        <div class="col-12 m-2"><a href="#" class="btn" style="background-color:#00AF87; color:white" id="reserva-${libro[0].id}">Reserva</a></div>
      </div>`
      const libroReserva = libroItem.querySelector(`#reserva-${libro[0].id}`)
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
    contLibro.appendChild(libroItem)
  }
}