import { createClient } from '@supabase/supabase-js';
import { Salas } from './vistaSalas.js'
export default {
  template: `
    <h1>Lista de salas</h1>
    <div class="container">
      <form id="search-id-sala" class="d-flex p-5">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchSala">
        <button class="btn" style="border-color:#77B7E1;" type="submit">Search</button>
      </form>
      <a href="#/addSala" class="btn btn-success ms-3" color:white" id="add-"> + Add</a>
    </div>
    <div class="container" id="sala-list"></div>
  `,
  async script() {
    console.log('pruebas supabase')
    const main= document.querySelector('main')
    main.style.backgroundColor='#FFFFFF'
    main.style.backgroundImage='url("")'
    main.style.height='auto'
    const salaList = document.createElement('div')
    salaList.classList.add('row');

    const salas = await Salas.getAllSalas()
        salas.forEach((sala) => {
          const salaItem = document.createElement('div')
          salaItem.innerHTML = `
          <div class="card p-3 m-3 container-fluid">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${sala.imagen}" class="img-fluid rounded-start" alt="${sala.nombre}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${sala.nombre}</h5>
                <p class="card-text">${sala.sala_descripcion}</p>
                <p class="card-text"><small class="text-muted">Aforo: ${sala.aforo}</small></p>
                <a href="#" class="btn btn-danger" color:white" id="eliminar-${sala.id}">Eliminar</a>
                <a href="#" class="btn btn-warning" color:white" id="editar-${sala.id}">Editar</a>
              </div>
            </div>
          </div>
        </div>
          `
          salaList.appendChild(salaItem)

          //
          const salaReserva = salaItem.querySelector(`#eliminar-${sala.id}`)
          salaReserva.addEventListener('click', async(e)=>{
            console.log("Boton eliminar")
            const salaReservaId = e.target.id
            const salaId = salaReservaId.replace("eliminar-", "")
            //Conflicto pq si no tiene estado da error
            //const confirmacion = window.confirm("¿Estás seguro de que quieres reservar este libro?");
            swal("Desea eliminar el libro?",{
                buttons:["Cancelar", "Confirmar"]
            })
            .then(async(value) => {
              if (value) {
                
                await Salas.eliminar(salaId)
                window.location = '#/adminSalas'
              } else {
                swal({title:'Cancelado', icon:'warning'})
                
              }
            })
            
            
           })
          salaList.appendChild(salaItem)
          const salaEdit = salaItem.querySelector(`#editar-${sala.id}`)
          salaEdit.addEventListener('click', async(e)=>{
            const salaEditId = e.target.id
            const EditId = salaEditId.replace("editar-", "")
            //Pasamos el id del libro mediante el header
            const guardarId= document.querySelector('#guardar-id')
            guardarId.value = EditId
            window.location = '#/editSala'

          })
        })
        
        const salaListContainer = document.getElementById('sala-list')
        salaListContainer.appendChild(salaList)
        


      //FILTRO SEARCH
       const formsearch = document.querySelector('#search-id-sala')
          formsearch.addEventListener('submit', async(e)=>{
            e.preventDefault()
            const texto =e.target.searchSala.value
            const salasSearch = await Salas.getSearchSalas(texto)
          
            salaList.innerHTML = ""
          
            salasSearch.forEach((sala) => {
              const nuevaSala = document.createElement('div')
              nuevaSala.innerHTML = `
              <div class="card p-3 m-3 container-fluid">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${sala.imagen}" class="img-fluid rounded-start" alt="${sala.nombre}">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${sala.nombre}</h5>
                    <p class="card-text">${sala.sala_descripcion}</p>
                    <p class="card-text"><small class="text-muted">Aforo: ${sala.aforo}</small></p>
                    <a href="#" class="btn btn-danger" color:white" id="eliminar-${sala.id}">Eliminar</a>
                    <a href="#" class="btn btn-warning" color:white" id="editar-${sala.id}">Editar</a>
                    <a href="#/addSala" class="btn btn-success" color:white" id="add-${sala.id}">Add</a>
                  </div>
                </div>
              </div>
            </div>  
              `
              salaList.appendChild(nuevaSala)
            })
            })
  }
}
