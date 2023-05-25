// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'
import { ReservaLibros } from './claseReservaLibros';
console.log('Conecciton done')
export class Libros {
  constructor (id=null, created_at=null, titulo=null, autor = null, isbn = null, fecha_publicacion=null, imagen=null, descripcion=null) {
    this.id = id
    this.created_at = created_at
    this.titulo= titulo
    this.autor = autor
    this.isbn = isbn
    this.fecha_publicacion = fecha_publicacion
    this.imagen = imagen
    this.descripcion = descripcion
  }


static async getAll() {
    const { data: libros , error } = await supabase
      .from('libros')
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion }) => {
        return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion )
    })
  }
  static async getAllByID(id) {
    const { data: libros , error } = await supabase
      .from('libros')
      .select('*')
      .eq('id', `${id}`)
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion }) => {
        return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion )
    })
  }
  static async getSearch(texto) {
    const { data: libros, error } = await supabase
          .from('libros')
          .select('*')
          .ilike('titulo', `%${texto}%`)
    if (error) {
      throw new Error(error.message)
    }
     //devuelve array de objetos
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion }) => {
        return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion )
    })
  }

  static async eliminar(libroId){
    const { data, error } = await supabase 
          .from('libros')
          .delete()
          .match({ id: `${libroId}` })
    if(error){
      swal({title:'No se ha podido eliminar',text:`${error}`, icon:'warning'})
    }else{
      swal({title:'Eliminado Correctamente', icon:'success'})
    }
  }
  static async addLibro(dataLibro){
    const { data, error } = await supabase
    .from('libros')
    .insert({
      titulo: dataLibro.titulo,
      autor: dataLibro.autor,
      isbn: dataLibro.isbn,
      fecha_publicacion: dataLibro.fecha,
      imagen: dataLibro.imagen
    })
    if(error){
      swal({title:'No se ha podido añadir el libro',text:`${error}`, icon:'warning'})
    }else{
      swal({title:'Añadir Correctamente', icon:'success'})
    }
  }
  static async updateLibro(dataLibro) {
    const { data, error } = await supabase
      .from('libros')
      .update({
        titulo: `${dataLibro.titulo}`,
        autor: `${dataLibro.autor}`,
        isbn: `${dataLibro.isbn}`,
        fecha_publicacion: `${dataLibro.fecha}`,
        imagen: `${dataLibro.imagen}`,
        descripcion: `${dataLibro.descripcion}`
      })
      .match({ id: `${dataLibro.id}` })
  
    if (error) {
      swal({ title: 'No se ha podido actualizar el libro', text: `${error}`, icon: 'warning' })
    } else {
      swal({ title: 'Actualizado', icon: 'success' })
    }
  }  
}


