import { createClient } from '@supabase/supabase-js'
import { ReservaLibros } from './claseReservaLibros'
import { ReservaSalas } from './claseReservaSala'
import { Amonestaciones } from './claseAmonestaciones'
import { Usuarios } from './usuarios'
import { User } from './user'
import { Libros } from './claseLibros'
import { Salas } from './vistaSalas'

export default {
  template: `
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center mt-5">
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
      <div class="col-12 border  border-dark border-2 m-5 p-2 mx-auto align-self-center text-center rounded" style="background-color: #FFFFFF;" id="amonestaciones-id">
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
    //main.style.backgroundImage('https://cdn.pixabay.com/photo/2020/10/09/20/09/library-5641389_640.jpg')
    main.style.backgroundColor='#77B7E1'
    main.style.height='auto'
    const res= document.querySelector('#res-libros')
    //Faltaria obtener el id del usuario y pasarlo como parametro
    const obtID = document.querySelector('#guardarUser-id')
    console.log("Este es el id busc", obtID.value)
    const reservaLibros = await ReservaLibros.getReservasByUserId(obtID.value)
    //Cambio de forEach ya que no permite promesas
    for (const reserva of reservaLibros) {
      const imgLibro = await Libros.getAllByID(reserva.id_libro) 
      const txtreserva = document.querySelector('#txt-reservas')
      const libroItem = document.createElement('div')
          if(reserva.estado==="Devuelto"){
          libroItem.innerHTML = `
          <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imgLibro[0].imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Número: #${reserva.id}</h5>
                <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva}</br> Fecha entrega:  ${reserva.fecha_entrega} </br> Estado: ${reserva.estado}</p>
                <a href="#" class="btn disabled" color:white" id="devolver-${reserva.id_libro}">Devolver</a>
              </div>
            </div>
          </div>
        </div>`
          }else if(reserva.estado==="Pending"){
            libroItem.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${imgLibro[0].imagen}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Número: #${reserva.id}</h5>
                  <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva}</br> Fecha entrega:  ${reserva.fecha_entrega} </br> Estado: ${reserva.estado}</p>
                  <a href="#" class="btn disabled border border-warning" color:white" id="devolver-${reserva.id_libro}">Pending...</a>
                </div>
              </div>
            </div>
          </div>`
          }else{
          libroItem.innerHTML = `
          <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imgLibro[0].imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Número: #${reserva.id}</h5>
                <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva}</br> Fecha entrega:  ${reserva.fecha_entrega} </br> Estado: ${reserva.estado}</p>
                <a href="#" class="btn btn-success" color:white" id="devolver-${reserva.id_libro}">Devolver</a>
              </div>
            </div>
          </div>
        </div>
          `}
          //if(reserva){txtreserva.style.display="none"}
          const libroReserva = libroItem.querySelector(`#devolver-${reserva.id_libro}`)
          libroReserva.addEventListener('click', async(e)=>{
            console.log("Boton reservar")
            const libroReservaId = e.target.id
            const libroId = libroReservaId.replace("devolver-", "")
            //Conflicto pq si no tiene estado da error
            //const confirmacion = window.confirm("¿Estás seguro de que quieres reservar este libro?");
            swal("Desea devolver el libro?",{
                buttons:["Cancelar", "Confirmar"]
            })
            .then(async(value) => {
              if (value) {
                //swal({title:'Confirmado', icon:'success'})
                await ReservaLibros.devolver(libroId, obtID.value)
                window.location = '#/reservas'
              } else {
                swal({title:'Cancelado', icon:'warning'})
                //console.log("Has hecho clic en el botón Cancelar");
              }
            })
            //if (confirmacion) {
            //await Libros.estado(libroId)
            //}
            
           })
      res.appendChild(libroItem)
  }
  const reSala= document.querySelector('#res-salas')
    //Faltaria obtener el id del usuario y pasarlo como parametro
    const reservaSalas = await ReservaSalas.getReservasByUserId(obtID.value)
    for (const reserva of reservaSalas) {
          const imgSala = await Salas.getByID(reserva.sala_id) 
          const salaItem = document.createElement('div')
          salaItem.innerHTML = `
          <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imgSala[0].imagen}" style="height:100%; width:100%;" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Número: #${reserva.id}</h5>
                <p class="card-text">Fecha Reserva: ${reserva.fecha_reserva}</br> Fecha entrega:  ${reserva.fecha_fin} </br> Estado: ${reserva.estado}</p>
              </div>
            </div>
          </div>
        </div>` 
      reSala.appendChild(salaItem)
  }

  //const amnt = document.querySelector('#amonestaciones-id')
  //const emailUser = await User.getUser()
  //console.log(emailUser.email)
  //const userAmnt = await Usuarios.getUserByEmail(emailUser.email)
  //console.log("Este es el id: ",userAmnt.id)
  //const obtenerAmt = await Amonestaciones.getUserAmt(userAmnt.id)
  //console.log(obtenerAmt)//Dará null ojo
  //const obtAmonestaciones = Amonestaciones.getUserAmt(user.email)
 // await User.getAllUsers()
  
}
}