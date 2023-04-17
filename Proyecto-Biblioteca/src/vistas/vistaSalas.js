// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

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
}