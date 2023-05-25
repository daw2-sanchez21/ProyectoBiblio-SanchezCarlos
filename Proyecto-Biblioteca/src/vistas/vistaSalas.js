// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'
import { ReservaSalas } from './claseReservaSala'

console.log('Conecciton done')
export class Salas {
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
      sala_descripcion: dataSala.descripcion,
      aforo: dataSala.aforo,
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
        sala_descripcion: `${dataSala.descripcion}`,
        aforo: `${dataSala.aforo}`,
        imagen: `${dataSala.imagen}`
      })
      .match({ id: `${dataSala.id}` })
  
    if (error) {
      swal({ title: 'No se ha podido actualizar la sala', text: `${error}`, icon: 'warning' })
    } else {
      swal({ title: 'Actualizado', icon: 'success' })
    }
  }
  static async estado(salaId){
    const { data, error } = await supabase 
          .from('reserva_sala')
          .select('estado')
          .eq('id', `${salaId}`)
          if(data && data.length > 0 && data[0].estado=="Reservado"){
            //Mejorar alert para cuando el libro no esté disponible
            swal({title:'No disponible', icon:'warning'})
          
          }else{
            swal({title:'Confirmado', icon:'success'})
            const userId = document.querySelector('#guardarUser-id')
            const fecha_actual = new Date().toISOString().substring(0, 10)
            const dataSala = {
              id: userId.value,
              fecha:fecha_actual,
              sala: salaId
            }
            console.log("problema?", dataSala.id, dataSala.fecha, dataSala.sala)
            await ReservaSalas.update(dataSala)
            
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