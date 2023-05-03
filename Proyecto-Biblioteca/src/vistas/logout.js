import { User } from './user'
import { header } from '../componentes/header'
export default  {
  template: ``,
  async script() {
    await User.logout()
    console.log("Sesion cerrada")
    header.script()
    window.location = '#/login'
  }
}
