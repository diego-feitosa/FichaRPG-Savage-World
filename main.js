import {montar_atributos_html} from "./atributos.js"


window.onload = () => {

    const atributos = document.querySelector("#atributos");
    montar_atributos_html(atributos);

}