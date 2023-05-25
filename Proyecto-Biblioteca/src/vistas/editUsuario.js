import { Libros } from './claseLibros.js'
import { Usuarios } from './usuarios.js'
export default {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Editar Usuario</h2>
    <div class="m-3">
      <label class="form-label">Nombre: </label>
      <input type="text" class="form-control" id="nombre-id" require>    
    </div>
    <div class="m-3">
      <label class="form-label">Apellido: </label>
      <input type="text" class="form-control" id="apellido-id" require>    
    </div>
    <div class="m-3">
      <label  class="form-label">Nick: </label>
      <input type="text" class="form-control" id="nick-id"  require>
    </div>
    <div class="m-3">
    <label class="form-label">Rol:</label>
      <select class="form-select" id="rol-id" required>
        <option value="default">Default</option>
        <option value="admin">Admin</option>
        <option value="supervisor">Supervisor</option>
      </select>
    </div>

    <button type="submit" class="btn btn-success m-3">Editar</button>
  </form></div></div></div></div></div>`,

  async script() {
    const main= document.querySelector('main')
    main.style.backgroundColor='#77B7E1'
    main.style.height='1000px'
    const obtenerId= document.querySelector('#guardar-id')
    console.log(obtenerId.value)
    const nombre = document.querySelector('#nombre-id')
    const apellido = document.querySelector('#apellido-id')
    const nick = document.querySelector('#nick-id')
    const rol = document.querySelector('#rol-id')
    const obtUser = await Usuarios.getByUserId(obtenerId.value)
    console.log("este es el user", obtUser)
    nombre.value= obtUser[0].nombre
    apellido.value= obtUser[0].apellido
    nick.value= obtUser[0].nick
    rol.value = obtUser[0].password
    const form = document.querySelector('#form-id')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        const nombre = form.querySelector('#nombre-id')
        const apellido = form.querySelector('#apellido-id')
        const nick = form.querySelector('#nick-id')
        const rol = document.querySelector('#rol-id')
        const dataLibro = {
            id: obtenerId.value,
            nombre: nombre.value,
            apellido: apellido.value,
            nick: nick.value,
            rol: rol.value
        }
        await Usuarios.editar(dataLibro)
        window.location = '#/adminUser'
    })


    
        
    }
}