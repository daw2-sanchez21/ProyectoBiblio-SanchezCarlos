import { supabase } from './supabase'
export default {
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <img src="https://ajuntament.barcelona.cat/museudeldisseny/sites/default/files/styles/default/public/centredoc_header.jpg?itok=NMt4NRsX" width="100%"  alt="" class=""">
            </div>
        </div>
        <div class="row">
            <div class="col-12">
            <h2>Qui som?</h2>
            <p>La biblioteca Llefià-Xavier Soto, ubicada al barri de Sant Joan de Llefià, és el servei bibliotecari de referència del Districte IV de Badalona (integrat pels barris de Sant Antoni, Sant Joan i Sant Mori de Llefià i La Salut), amb més de 60.000 habitats. La biblioteca forma part de la Xarxa Municipal de Biblioteques de Badalona juntament amb 4 biblioteques de districte (Sant Roc, Lloreda, Pomar i Canyadó-Casagemes Joan Argenté) i la Biblioteca Central Urbana Can Casacuberta. Va ser inaugurada el 8 de juny de l'any 2002 i porta com a nom el del barri on està ubicada i el del parlamentari badaloní Xavier Soto (1961-1995). La Biblioteca ocupa una superfície de 1.100m2 distribuïts en dos nivells i disposa d’un espai de suport que acull activitats i formacions. · A la planta d’accés hi ha la zona d’acollida i promoció, l’espai de música i imatge, l’àrea infantil i les dependències de treball intern. · A la planta inferior hi ha la zona general, l’àrea de revistes i diaris i l’espai de suport. La biblioteca ofereix un variat fons de més de 46.000 documents d'entre els quals hi ha més de 37.000 llibres, 5.000 documents audiovisuals i 130 subscripcions a revistes i diaris.</p>
            <a href="#" class="btn btn-warning">Leer más</a>
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