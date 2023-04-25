import { createClient } from '@supabase/supabase-js'
import { ReservaLibros } from './claseReservaLibros'
import { ReservaSalas } from './claseReservaSala'

export default {
  template: `
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
  <div class="container m-5 p-5">
    <div class="row d-flex align-items-center">
      <div class="col-5 border  border-dark border-2 m-4 mx-auto align-self-center text-center justify-content-center rounded" style="background-color: #FFFFFF;" id="res-libros">
        <h2 class="border-bottom">Mis libros</h2>
      </div>
      <div class="col-5 border  border-dark border-2 m-4 mx-auto align-self-center text-center justify-content-center rounded" style="background-color: #FFFFFF;" id="res-salas">
        <h2 class="border-bottom">Mis salas</h2>
      </div>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-12 border  border-dark border-2 m-5 p-2 mx-auto align-self-center text-center rounded" style="background-color: #FFFFFF;" id="res-salas">
        <h2 class="border-bottom">Amonestaciones</h2>
        <p>No hay amonestaciónes</>
      </div>
    </div>
  </div>
</div>


`,

  async script (){
    console.log('Reservas')
    const main= document.querySelector('main')
    main.style.backgroundColor='#77B7E1'
    main.style.height='1000px'
    const res= document.querySelector('#res-libros')
    //Faltaria obtener el id del usuario y pasarlo como parametro
    const reservaLibros = await ReservaLibros.getReservasByUserId(1)
    reservaLibros.forEach((reserva) => {
          const libroItem = document.createElement('div')
          libroItem.classList.add('card', 'col-3', 'p-3', 'm-3')
          libroItem.style.width = '18rem'
          libroItem.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">Número: #${reserva.id}</h5>
              <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva} Fecha entrega:  ${reserva.fecha_entrega} Estado: ${reserva.estado}</p>
            </div>
          `
      res.appendChild(libroItem);
  })
  const reSala= document.querySelector('#res-salas')
    //Faltaria obtener el id del usuario y pasarlo como parametro
    const reservaSalas = await ReservaSalas.getAllReservas()
    reservaSalas.forEach((reserva) => {
          const salaItem = document.createElement('div')
          salaItem.classList.add('card', 'col-3', 'p-3', 'm-3')
          salaItem.style.width = '18rem'
          salaItem.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">Número: #${reserva.id}</h5>
              <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva} Fecha fin:  ${reserva.fecha_fin}</br> Estado: ${reserva.estado}</p>
            </div>
          ` 
      reSala.appendChild(salaItem)
  })
  
  
}
}