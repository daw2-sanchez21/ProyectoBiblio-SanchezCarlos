import { User } from './user'

export default  {
  template: ``,
  async script() {
    await User.logout()
    console.log("Sesion cerrada")
    window.location = '#/login'
  }
}
