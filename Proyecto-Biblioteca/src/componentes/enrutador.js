export const enrutador = {
   rutas: {
    login: import('../vistas/login.js'),
    registro: import('../vistas/registro.js'),
    libros: import('../vistas/libros.js'),
    salas: import('../vistas/salas.js'),
    reservas: import('../vistas/reservas.js'),
    adminLibros: import('../vistas/adminLibros.js')
  },

  async router() {
    const pathCompleto = window.location.hash;
    const path = pathCompleto.split('/')[1];
    const parametro = pathCompleto.split('/')[2];

    const componenteVista = await enrutador.rutas[path];
    console.log(componenteVista)

    if (componenteVista) {
      try {
        const vista = await componenteVista.default;
        document.querySelector('main').innerHTML = vista.template;
        vista.script(parametro);
      } catch (error) {
        console.log(error);
      }
    }
  },

  observadorRutas() {
    document.body.addEventListener('click', event => {
      const link = event.target;
      if (link.tagName === 'A') {
        event.preventDefault();
        const href = link.getAttribute('href');
        window.history.pushState({ path: href }, '', href);
        this.router();
      }
    });

    window.addEventListener('popstate', e => {
      console.log('evento popstate - Te estás moviendo por el historial');
      this.router();
    });
  }
};
