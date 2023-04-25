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
    this.fecha_entrega = fecha_fin
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


}