import { U as User, h as header } from "./main-ea9e3bc0.js";
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
