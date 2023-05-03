// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'
import { ReservaLibros } from './claseReservaLibros';
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
  static async getAllByID(id) {
    const { data: libros , error } = await supabase
      .from('libros')
      .select('*')
      .eq('id', `${id}`)
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen }) => {
        return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen )
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
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen }) => {
        return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen )
    })
  }

  static async estado(libroId){
    const { data, error } = await supabase 
          .from('reserva_libros')
          .select('estado')
          .eq('id', `${libroId}`)
          if(data && data.length > 0 && data[0].estado=="reservado"){
            //Mejorar alert para cuando el libro no esté disponible
            swal({title:'No disponible', icon:'warning'})
          
          }else{
            swal({title:'Confirmado', icon:'success'})
            await ReservaLibros.reservar(libroId, 1)
            
          }
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
        imagen: `${dataLibro.imagen}`
      })
      .match({ id: `${dataLibro.id}` })
  
    if (error) {
      swal({ title: 'No se ha podido actualizar el libro', text: `${error}`, icon: 'warning' })
    } else {
      swal({ title: 'Actualizado', icon: 'success' })
    }
  }
  

  
  
}


