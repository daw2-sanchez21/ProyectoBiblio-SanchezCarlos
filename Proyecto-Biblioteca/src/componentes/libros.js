import { createClient } from '@supabase/supabase-js'


export const libros = {
    template: `<h1>Lista de Libros</h1>
    <div id="libros-list"></div>`,
    script: async ()=>{
        console.log('purebas supabase');
        //Creando la conexión con supabase
        const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA'
        const supabase = createClient(supabaseUrl, supabaseKey)
      
        supabase
        .from('libros')
        .select('id, titulo, autor, imagen')
        .then(({ data: libros, error }) => {
          if (error) {
            console.error(error);
            return;
          }
          
          // Creamos la lista de libros en HTML
          const librosList = document.createElement('ul');
          
          // Agregamos cada libro a la lista
          libros.forEach(libro => {
            const libroItem = document.createElement('li');
            libroItem.innerHTML = `
              <div>
                <img src="${libro.imagen}" alt="${libro.titulo} width="300px" height="320px" ">
                <h3>${libro.titulo}</h3>
                <p>${libro.autor}</p>
              </div>
            `;
            librosList.appendChild(libroItem);
          });
          
          // Agregamos la lista de libros al elemento HTML con el ID "libros-list"
          const librosListContainer = document.getElementById('libros-list');
          librosListContainer.appendChild(librosList);
        });
    }
}