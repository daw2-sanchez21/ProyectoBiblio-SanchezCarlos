// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

console.log('Conecciton done')
export class ReservaSalas {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, created_at=null, usuario_id=null, sala_id=null, fecha_reserva = null, fecha_fin = null, estado=null) {
    this.id = id
    this.created_at = created_at
    this.usuario_id = usuario_id
    this.sala_id= sala_id
    this.fecha_reserva = fecha_reserva
    this.fecha_fin = fecha_fin
    this.estado = estado
  }

static async getAllReservas() {
  const { data: reservas , error } = await supabase
      .from('reserva_sala')
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return reservas.map(({ id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado}) => {
        return new ReservaSalas(id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado)
    })
}
static async reservar(sala, usuario) {
  const { data, error } = await supabase
  .from('reserva_sala')
  .insert([
    { usuario_id: `${usuario}`, sala_id: `${sala}`, estado: "Reservado" },
  ])
    if(error){
      swal({title:'Error',text:'Ya tienes una reserva en curso', icon:'warning'})
    }else{
      swal({title:'Reservado',text:`Has reservado la sala ${sala}`, icon:'success'})
      //alert(`RESERVADO! Libro: ${libro} User: ${usuario}`)
    }
  
}
static async getReservasByUserId(id) {
  const { data: reservas , error } = await supabase
      .from('reserva_sala')
      .select('*')
      .eq('usuario_id', `${id}`)
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return reservas.map(({  id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado}) => {
        return new ReservaSalas( id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado)
    })
}

}