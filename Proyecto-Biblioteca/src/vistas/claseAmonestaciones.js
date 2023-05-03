// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'
import { ReservaLibros } from './claseReservaLibros';
console.log('Conecciton done')
export class Amonestaciones {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, created_at=null, usuario_id=null, fecha_inicio=null, fehca_fin=null, multa=null) {
    this.id = id
    this.created_at = created_at
    this.usuario_id = usuario_id
    this.fecha_inicio = fecha_inicio
    this.fehca_fin = fehca_fin
    this.multa = multa 
  }
  //Obtener ID, mirar primero como enlazar uid e id
  static async getUserAmt(id){
        const { data: amonestaciones , error } = await supabase
            .from('amonestaciones')
            .select('*')
            .eq('usuario_id', `${id}`)
          if (error) {
            throw new Error(error.message)
          }
          // devuelve array de objetos
          return amonestaciones.map(({ id, created_at, usuario_id, fecha_inicio, fehca_fin, multa}) => {
              return new Amonestaciones(id, created_at, usuario_id, fecha_inicio, fehca_fin, multa)
          })
  }
}