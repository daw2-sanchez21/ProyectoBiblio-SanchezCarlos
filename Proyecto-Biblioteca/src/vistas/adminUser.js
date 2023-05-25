import { Libros } from "./claseLibros"
import { Usuarios } from "./usuarios"

export default {
  template: `
    <h1>Lista de Usuarios</h1>
    <div class="container" id="user-list">
    <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Nick</th>
        <th scope="col">Email</th>
        <th scope="col">Rol</th>
        <th scope="col">Bloquear</th>
        <th scope="col">Editar</th>
      </tr>
    </thead>
    <tbody id="tabla">

    </tbody>
    </div>
  `,
  async script() {
    const usuarios = await Usuarios.getAll()
    const main= document.querySelector('main')
    main.style.backgroundColor='#FFFFFF'
    main.style.backgroundImage='url("")'
    main.style.height='auto'
    const insTabla = document.querySelector('#tabla')
    usuarios.forEach((usuario) => {
      const usuarioItem = document.createElement('tr')
      //libroItem.classList.add('scope="col"')
      usuarioItem.innerHTML = `
      <th scope="row">${usuario.id}</th>
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.nick}</td>
      <td>${usuario.email}</td>
      <td>${usuario.rol}</td>
      <td><a href="#" class="btn btn-danger" color:white" id="eliminar-${usuario.id}">Eliminar</a></td>
      <td><a href="#" class="btn btn-warning" color:white" id="editar-${usuario.id}">Editar</a></td>
        `
    

    //
    const userEliminar = usuarioItem.querySelector(`#eliminar-${usuario.id}`)
    userEliminar.addEventListener('click', async(e)=>{
      console.log("Boton eliminar")
      const userEliminarId = e.target.id
      const userId = userEliminarId.replace("eliminar-", "")
      //Conflicto pq si no tiene estado da error
      //const confirmacion = window.confirm("¿Estás seguro de que quieres reservar este libro?");
      swal("Desea eliminar el usuario?",{
          buttons:["Cancelar", "Confirmar"]
      })
      .then(async(value) => {
        if (value) {
          //swal({title:'Confirmado', icon:'success'})
          await Usuarios.bloquear(userId)
          window.location = '#/adminUser'
        } else {
          swal({title:'Cancelado', icon:'warning'})
          //console.log("Has hecho clic en el botón Cancelar");
        }
      })
      //if (confirmacion) {
      //await Libros.estado(libroId)
      //}
    })
      const usuarioEdit = usuarioItem.querySelector(`#editar-${usuario.id}`)
      usuarioEdit.addEventListener('click', async(e)=>{
        const usuarioEditId = e.target.id
        const usuarioId = usuarioEditId.replace("editar-", "")
        //Pasamos el id del libro mediante el header
        const guardarId= document.querySelector('#guardar-id')
        guardarId.value = usuarioId
        window.location = '#/editUser'

      })
      insTabla.appendChild(usuarioItem)
     })
    //
   

    

  }
}
