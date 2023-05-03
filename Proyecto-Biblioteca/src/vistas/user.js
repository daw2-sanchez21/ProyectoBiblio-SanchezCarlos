// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

console.log('Conecciton done')
export class User {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, email = null, password = null) {
    this.id = id
    this.email = email
    this.password = password
  }
  // login
  static async login (userData) {
    // USER LOGIN
      const { data, error } = await supabase.auth.signInWithPassword(userData)
      if (error) {
        throw new Error(error.message)
      }
      return new User(data.user.id, data.user.email)
    }
    static async create (userData) {
        const { data, error } = await supabase.auth.signUp(userData)
    
        if (error) {
          throw new Error(error.message)
        }
        console.log('usuario creado correctamente ', data)
        return new User(data.user.id,data.user.email)
    }
    static async logout(){
      // USER LOGOUT
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
    return true
    }
  // leer user logeado
  static async getUser () {
    const anm = "anm"
    try {
      // GET USER
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        return new User(user.id, user.email)
      } else {
        return false
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async getAllUsers () {
    const { data, error } = await supabase.auth.api.listUsers("TofohfnkahpZa33nkOM/SCPCQDhN/rrjxeXokkdRNbqvP5hr648S4wFcv3IASZAroSzlHfSzDXLMjPMlD0/B9Q==")
  if (error) {
  console.log(error)
} else {
  console.log(data)
}
  }
  
  
}
