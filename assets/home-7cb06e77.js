import "./main-ee19579a.js";
const home = {
  template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <img src="https://cdn.pixabay.com/photo/2016/03/26/22/21/books-1281581_1280.jpg" width="100%" height="90%" alt="" class=""">
            </div>
        </div>
    </div>
    <div class="container-fluid m-5">
        <div class="row d-flex">
            <div class="col-4">
                <img src="https://cdn.pixabay.com/photo/2022/08/24/15/42/library-7408106_1280.jpg" width="90%" height="80%"  alt="" class=""">
            </div>
            <div class="col-6">
                <h2>Qui som?</h2>
                <p>LLSM, es un sistema de gestión de servicios que ofrece la biblioteca de llefià, en nuestra web podrás buscar tu libro favorito y reservarlo desde casa y posteriormente acudir a la biblioteca a recogerlo. Además ofrecemos nuestras salas para que puedas acudir y disfrutar de la lectura. Regístrate para poder beneficiarte de todos los servicios.</p>
            </div>
        </div>
    </div>
    
            `,
  async script() {
    const main = document.querySelector("main");
    main.style.backgroundColor = "#FFFFFF";
    main.style.height = "auto";
  }
};
export {
  home as default
};
