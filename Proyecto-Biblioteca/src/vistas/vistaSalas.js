// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'
import { ReservaSalas } from './claseReservaSala'

console.log('Conecciton done')
export class Salas {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, created_at=null, nombre=null, aforo = null, sala_descripcion = null, imagen=null) {
    this.id = id
    this.created_at = created_at
    this.nombre= nombre
    this.aforo = aforo
    this.sala_descripcion = sala_descripcion
    this.imagen = imagen
  }

  static async getAllSalas() {
    const { data: salas, error } = await supabase
      .from('salas')
      .select('*')
      if (error) {
        throw new Error(error.message)
      }
      // devuelve array de objetos
      return salas.map(({ id, created_at, nombre, aforo, sala_descripcion, imagen }) => {
          return new Salas(id, created_at, nombre, aforo, sala_descripcion, imagen )
      })
  }
  static async getSearchSalas(texto) {
    const { data: salas, error } = await supabase
          .from('salas')
          .select('*')
          .ilike('nombre', `%${texto}%`)
    if (error) {
      throw new Error(error.message)
    }
     //devuelve array de objetos
    return salas.map(({ id, created_at, nombre, aforo, sala_descripcion, imagen }) => {
        return new Salas(id, created_at, nombre, aforo, sala_descripcion, imagen )
    })
  }
  static async eliminar(salaId){
    const { data, error } = await supabase 
          .from('salas')
          .delete()
          .match({ id: `${salaId}` })
    if(error){
      swal({title:'No se ha podido eliminar',text:`${error}`, icon:'warning'})
    }else{
      swal({title:'Eliminado Correctamente', icon:'success'})
    }
  }
  static async addSala(dataSala){
    const { data, error } = await supabase
    .from('salas')
    .insert({
      nombre: dataSala.nombre,
      aforo: dataSala.aforo,
      sala_descripcion: dataSala.sala_descripcion,
      imagen: dataSala.imagen
    })
    if(error){
      swal({title:'No se ha podido añadir la sala',text:`${error}`, icon:'warning'})
    }else{
      swal({title:'Añadido Correctamente', icon:'success'})
    }
  }
  static async updateSala(dataSala) {
    const { data, error } = await supabase
      .from('salas')
      .update({
        nombre: `${dataSala.nombre}`,
        aforo: `${dataSala.aforo}`,
        sala_descripcion: `${dataSala.descripcion}`,
        imagen: `${dataSala.imagen}`
      })
      .match({ id: `${dataSala.id}` })
  
    if (error) {
      swal({ title: 'No se ha podido actualizar la sala', text: `${error}`, icon: 'warning' })
    } else {
      swal({ title: 'Actualizado', icon: 'success' })
    }
  }
  static async estado(SalaId){
    const { data, error } = await supabase 
          .from('reserva_sala')
          .select('estado')
          .eq('id', `${SalaId}`)
          if(data && data.length > 0 && data[0].estado=="Ocupada"){
            //Mejorar alert para cuando el libro no esté disponible
            swal({title:'No disponible', icon:'warning'})
          
          }else{
            swal({title:'Confirmado', icon:'success'})
            const userId = document.querySelector('#guardarUser-id')
            await ReservaSalas.reservar(SalaId, userId.value)
            
          }
  }
  static async getByID(id) {
    const { data: salas , error } = await supabase
      .from('salas')
      .select('*')
      .eq('id', `${id}`)
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return salas.map(({ id, created_at, nombre, aforo, sala_descripcion, imagen }) => {
        return new Salas(id, created_at, nombre, aforo, sala_descripcion, imagen )
    })
  }
  
  
}