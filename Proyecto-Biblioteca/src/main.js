// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


import { header } from './componentes/header'
import { footer } from './componentes/footer'
import { home } from './vistas/home'
import { libros } from './componentes/libros';
import { salas } from './componentes/salas';
import { login } from './componentes/login';
import { registro } from './componentes/registro';
import { adminLibros } from './componentes/adminLibros';


document.querySelector('header').innerHTML = header.template
document.querySelector('main').innerHTML = home.template
//document.querySelector('main').innerHTML = libros.template
//libros.script()
//document.querySelector('main').innerHTML = salas.template
//salas.script()
//document.querySelector('main').innerHTML = login.template
//login.script()
//document.querySelector('main').innerHTML = registro.template
//registro.script()
document.querySelector('main').innerHTML = adminLibros.template
adminLibros.script()
document.querySelector('footer').innerHTML = footer.template