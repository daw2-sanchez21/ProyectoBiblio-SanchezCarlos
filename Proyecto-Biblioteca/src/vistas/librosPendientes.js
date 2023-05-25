import { Libros } from "./claseLibros"
import { Usuarios } from "./usuarios"
import { ReservaLibros } from "./claseReservaLibros"
export default {
  template: `
    <h1>Lista de Usuarios</h1>
    <div class="container mt-5" id="user-list">
    <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">User Id</th>
        <th scope="col">Libro Id</th>
        <th scope="col">Fecha Reserva</th>
        <th scope="col">Fecha Entrega</th>
        <th scope="col">Estado</th>
        <th scope="col">Confirmar</th>
        <th scope="col">Amonestar</th>
      </tr>
    </thead>
    <tbody id="tabla">

    </tbody>
    </div>
  `,
  async script() {
    const reservas = await ReservaLibros.getAllReservas()
    console.log("this: ", reservas)
    const main= document.querySelector('main')
    main.style.backgroundColor='#FFFFFF'
    main.style.height='auto'
    const insTabla = document.querySelector('#tabla')
    reservas.forEach((reserva) => {
      const usuarioItem = document.createElement('tr')
      //libroItem.classList.add('scope="col"')
      usuarioItem.innerHTML = `
      <th scope="row">${reserva.id}</th>
      <td>${reserva.id_usuario}</td>
      <td>${reserva.id_libro}</td>
      <td>${reserva.fecha_reserva}</td>
      <td>${reserva.fecha_entrega}</td>
      <td>${reserva.estado}</td>
      <td><a href="#" class="btn btn-danger" color:white" id = "confirmar" data-id-libro="${reserva.id_libro}" data-id-user="${reserva.id_usuario}"">Confirmar</a></td>
      <td><a href="#" class="btn btn-warning" color:white" id = "amonestar" data-id-user="${reserva.id_usuario}" data-id-res="${reserva.id}"">Amonestar</a></td>
        `
    

    //
    const userEliminar = usuarioItem.querySelector(`#confirmar`)
    userEliminar.addEventListener('click', async(e)=>{
    const libro = userEliminar.getAttribute("data-id-libro")
    const usuario = userEliminar.getAttribute("data-id-user")
    
      swal("Desea confirmar la devolución?",{
          buttons:["Cancelar", "Confirmar"]
      })
      .then(async(value) => {
        if (value) {
          swal({title:'Confirmado', icon:'success'})
          
          await ReservaLibros.confirmarDev(libro, usuario)
          window.location = '#/librospendientes'
        } else {
          swal({title:'Cancelado', icon:'warning'})
          
        }
      }) 
      
     })
    //
    //
    //
    const userAmon = usuarioItem.querySelector(`#amonestar`)
    userAmon.addEventListener('click', async(e)=>{
    const res = userEliminar.getAttribute("data-id-res")
    const user = userEliminar.getAttribute("data-id-user")
    
    swal({title:'Futura Mejora',text:'Esta opción estará disponible en la próxima actualización', icon:'success'})//,{
         // buttons:["Cancelar", "Confirmar"]
      //})
     // .then(async(value) => {
       // if (value) {
       //   swal({title:'Amonestado', icon:'success'})
          
       //   await ReservaLibros.confirmarDev(user, res)
        //  window.location = '#/librospendientes'
      //  } else {
      //    swal({title:'Cancelado', icon:'warning'})
          
       /// }
      //}) 
      
     })
    //
    //
    insTabla.appendChild(usuarioItem)

    

  })
  }
}