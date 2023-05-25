// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

export class Usuarios {
  // Mapping de propiedades de la tabla perfiles
  constructor (id= null, created_at=null, nombre=null, apellido=null, nick=null, email = null, password = null, rol=null) {
    this.id = id
    this.created_at = created_at
    this.nombre = nombre
    this.apellido = apellido
    this.nick = nick
    this.email = email
    this.password = password
    this.rol = rol
  }
  //Obtener todos los usuarios
  static async getAll() {
    const { data: usuario , error } = await supabase
      .from('usuarios')
      .select('*')
    if (error) {
      throw new Error(error.message)
    }
    return usuario.map(({ id, created_at, nombre, apellido, nick, email, password, rol }) => {
      return new Usuarios(id, created_at, nombre, apellido, nick, email, password, rol)
  })
    
  }
   //Crear nuevo usuario a partir de los datos recibidos
   static async create (usuariosData) {
    const { error } = await supabase
      .from('usuarios')
      .insert(usuariosData)
      .select()
    if (error) {
      // Cargamos la página login
      window.location.href = '/#/registro'
      throw new Error(error.message)
    }
    // Cargamos la página login
    window.location.href = '/#/login'
    return true
    }
  //Obtener el usuario por email
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
  //Obtener usuario por id
  static async getByUserId(id) {
    const { data: usuario , error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', `${id}`)
    if (error) {
      throw new Error(error.message)
    }
    return usuario.map(({ id, created_at, nombre, apellido, nick, email, rol}) => {
      return new Usuarios(id, created_at, nombre, apellido, nick, email, rol )
  })
}
  
  //Obtener usuario por email y luego extraer el rol
  static async getByUserRol(email) {
    const { data: usuario , error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', `${email}`)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    return new Usuarios (usuario.id, usuario.created_at, usuario.nombre, 
      usuario.apellido, usuario.nick, usuario.email, usuario.password, usuario.rol )
  }

  static async getUserByEmail (email) {
    const { data: usuario , error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', `${email}`)
      //console.log(usuario[0].id)
    if (error) {
      throw new Error(error.message)
    }
    return new Usuarios (usuario[0].id, usuario[0].nombre, usuario[0].apellido, usuario[0].nick, usuario[0].email, usuario[0].rol )
  }
  //Bloquear usuario por id
  static async bloquear(id) {
    const { data: usuario , error } = await supabase
      .from('usuarios')
      .update({ rol: 'Bloqueado' })
      .match({ id: `${id}`});
    if (error) {
      throw new Error(error.message)
    }
    swal({title:'Usuario Bloqueado', icon:'success'})
    return true
    
  }
  static async editar(dataEdit) {
    const { data: usuario , error } = await supabase
      .from('usuarios')
      .update({ nombre: `${dataEdit.nombre}`,
      apellido: `${dataEdit.apellido}`,
      nick:`${dataEdit.nick}`,
      rol:`${dataEdit.rol}`
      })
      .match({ id: `${dataEdit.id}`});
    if (error) {
      throw new Error(error.message)
    }
    swal({title:'Usuario Editado', icon:'success'})
    return true

  }
}