import { supabase } from './supabase'
export default {
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
                <p>LLSM, és un sistema de gestió de serveis que ofereix la biblioteca de llefià, a la nostra web podràs buscar el teu llibre favorit i reservar-lo des de casa i posteriorment acudir a la biblioteca a recollir-lo. A més, oferim les nostres sales perquè puguis acudir i gaudir de la lectura. Regsitra't per poder beneficiar-te de tots els serveis. </p>
            </div>
        </div>
    </div>
    
            `,

    async script() {
        const main = document.querySelector('main')
        main.style.backgroundColor='#FFFFFF'
        main.style.height='auto'
    }
}