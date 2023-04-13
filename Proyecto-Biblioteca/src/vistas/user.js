// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

console.log('Conecciton done')
export class User {
  // Mapping de propiedades de la tabla perfiles
  constructor (email = null, password = null) {
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
      return new User(data.user.email, data.user.password)
    }
    static async create (userData) {
        const { data, error } = await supabase.auth.signUp(userData)
    
        if (error) {
          throw new Error(error.message)
        }
        console.log('usuario creado correctamente ', data)
        return new User(data.user.email, data.user.password)
    }
  
}
