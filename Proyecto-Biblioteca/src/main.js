// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


import { header } from './componentes/header'
import { footer } from './componentes/footer'
import { home } from './vistas/home'

document.querySelector('header').innerHTML = header.template
document.querySelector('main').innerHTML = home.template
document.querySelector('footer').innerHTML = footer.template