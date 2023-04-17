// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

console.log('Conecciton done')
export class Usuarios {
  // Mapping de propiedades de la tabla perfiles
  constructor (id= null, nombre=null, apellido=null, nick=null, email = null, password = null, rol=null) {
    this.id = id;
    this.nombre = nombre
    this.apellido = apellido
    this.nick = nick
    this.email = email
    this.password = password
    this.rol = rol
  }
   // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
   static async create (usuariosData) {
    const { error } = await supabase
      .from('usuarios')
      .insert(usuariosData)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }
  static async getId (email) {
    const { data: usuarios , error } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    return usuarios
  }
  static async getByUserId(id) {
    const { data: usuario , error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    return new Usuarios (usuario.id, usuario.nombre, usuario.apellido, usuario.nick, usuario.email, usuario.rol )
  }
}