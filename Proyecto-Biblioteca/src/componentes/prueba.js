import { createClient } from '@supabase/supabase-js'

export const prueba = {
    template: `<h1>Pruebas Supabase</h1>`,
    script: async ()=>{
        console.log('purebas supabase');
        //Creando la conexión con supabase
        const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA'
        const supabase = createClient(supabaseUrl, supabaseKey)
        //console.log(supabase);

        //Consulta a la tabla perfiles
        const verTodosLosPerfiles = async ()=>{
        
                let { data: usuarios, error } = await supabase
                .from('usuarios')
                .select('*')
                return usuarios
                
        }
        let datos = await verTodosLosPerfiles(); 
        console.log(datos);
        
    }
}