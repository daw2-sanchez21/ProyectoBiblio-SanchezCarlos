import { U as User, h as header } from "./main-965f3a72.js";
const logout = {
  template: ``,
  async script() {
    await User.logout();
    console.log("Sesion cerrada");
    header.script();
    window.location = "#/login";
  }
};
export {
  logout as default
};
