// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'
import { ReservaLibros } from './claseReservaLibros';
console.log('Conecciton done')
export class Amonestaciones {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, created_at=null, reserva_id=null, usuario_id=null, fecha_inicio=null, multa=null, estado=null) {
    this.id = id
    this.created_at = created_at
    this.reserva_id = reserva_id
    this.usuario_id = usuario_id
    this.fecha_inicio = fecha_inicio
    this.multa = multa 
    this.estado = estado
  }
  
  static async getUserAmt(id){
        const { data: amonestaciones , error } = await supabase
            .from('amonestaciones')
            .select('*')
            .eq('usuario_id', `${id}`)
          if (error) {
            throw new Error(error.message)
          }
          // devuelve array de objetos
          return amonestaciones.map(({ id, created_at, reserva_id, usuario_id, fecha_inicio, multa, estado}) => {
              return new Amonestaciones(id, created_at, reserva_id, usuario_id, fecha_inicio, multa, estado)
          })
  }
  static async amonestar(user, libro){
    const { data: amonestacion , error } = await supabase
      .from('amonestaciones')
      .insert([
        { usuario_id: `${user}`, reserva_id: `${libro}`, estado: "Multado" },
      ])
      if (error) {
        throw new Error(error.message)
      }
      // devuelve array de objetos
      return amonestacion.map(({ id, created_at, reserva_id, usuario_id, fecha_inicio, multa, estado}) => {
          return new Amonestaciones(id, created_at, reserva_id, usuario_id, fecha_inicio, multa, estado)
      })
}
}