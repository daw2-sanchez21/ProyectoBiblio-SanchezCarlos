import { Libros } from './claseLibros.js'
import { Salas } from './vistaSalas.js'
export default {
  template: `<div class="container h-100" style="background-color:#77B7E1">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body"><form id="form-id">
        <h2 class="mb-3">Nueva Sala</h2>
    <div class="m-3">
      <label class="form-label">Titulo:</label>
      <input type="text" class="form-control" id="nombre-id">    
    </div>
    <div class="m-3">
      <label  class="form-label">Aforo:</label>
      <input type="text" class="form-control" id="aforo-id" pattern="[0-9]{1,}">
    
    </div>
    <div class="m-3"
      <label class="form-label">Descripción:</label>
      <input type="text" class="form-control" id="descripcion-id">
    </div>
    <div class="m-3">
      <label class="form-label">Imagen:</label>
      <input type="text" class="form-control" id="imagen-id" >
    </div>
    
    <button type="submit" class="btn btn-primary m-3">Editar</button>
  </form></div></div></div></div></div>`,

  async script() {
    const main= document.querySelector('main')
    main.style.backgroundColor='#77B7E1'
    main.style.height='1000px'
    const obtenerId= document.querySelector('#guardar-id')
    console.log("sala value id: ", obtenerId.value)
    const form = document.querySelector('#form-id')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        const nombre = form.querySelector('#nombre-id')
        const aforo = form.querySelector('#aforo-id')
        const descripcion = form.querySelector('#descripcion-id')
        const imagen = form.querySelector('#imagen-id')
        const dataSala = {
            nombre: nombre.value,
            aforo: aforo.value,
            descripcion: descripcion.value,
            imagen: imagen.value,
            id: obtenerId.value
        }
        await Salas.updateSala(dataSala)
        window.location = '#/adminSalas'
    })


    
        
    }
}