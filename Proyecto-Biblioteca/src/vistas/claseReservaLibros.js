// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

console.log('Conecciton done')
export class ReservaLibros {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, id_usuario=null, id_libro=null, fecha_reserva = null, fecha_entrega = null, estado=null) {
    this.id = id
    this.id_usuario = id_usuario
    this.id_libro= id_libro
    this.fecha_reserva = fecha_reserva
    this.fecha_entrega = fecha_entrega
    this.estado = estado
  }

static async getAllReservas() {
  const { data: reservas , error } = await supabase
      .from('reserva_libros')
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return reservas.map(({ id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado}) => {
        return new ReservaLibros(id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado)
    })
}
static async getReservasById(id) {
  const { data: reservas , error } = await supabase
      .from('reserva_libros')
      .select('*')
      .eq('id', `${id}`)
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return reservas.map(({ id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado}) => {
        return new ReservaLibros(id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado)
    })
}
static async getReservasByUserId(id) {
  const { data: reservas , error } = await supabase
      .from('reserva_libros')
      .select('*')
      .eq('id_usuario', `${id}`)
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return reservas.map(({ id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado}) => {
        return new ReservaLibros(id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado)
    })
}
static async reservar(libro, usuario) {
  const { data, error } = await supabase
  .from('reserva_libros')
  .insert([
    { id_usuario: `${usuario}`, id_libro: `${libro}`, fecha_reserva: "2023-04-10",fecha_entrega: "2023-07-10", estado: "Reservado" },
  ])
    if(error){
      swal({title:'Error',text:'Ya tienes una reserva en curso', icon:'warning'})
    }else{
      swal({title:'Reservado',text:`Has reservado el libro ${libro}`, icon:'warning'})
      //alert(`RESERVADO! Libro: ${libro} User: ${usuario}`)
    }
  
}

}