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

}