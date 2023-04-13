// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

console.log('Conecciton done')
export class Libros {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, created_at=null, titulo=null, autor = null, isbn = null, fecha_publicacion=null, imagen=null) {
    this.id = id
    this.created_at = created_at
    this.titulo= titulo
    this.autor = autor
    this.isbn = isbn
    this.fecha_publicacion = fecha_publicacion
    this.imagen = imagen
  }


static async getAll() {
    const { data: libros , error } = await supabase
      .from('libros')
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen }) => {
        return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen )
    })
  }

}