/*
*    JS Tienda de Componenetes
*   @author Carlos Vílchez <carlos.e.v.d@gmail.com>
*/

// Variables

var nickInput;
var emailInput;
var dificultadInput;
var numCartasInput;
var formEntrada;

var error;

var itemImg;
var avatarCont;


/**
 * Comprobación de los campos del formulario
 * @date 2023-12-21
 * @param { * } event
 */
function comprobarForm(event){
    //Comprobar cambios
    if(nickInput.value.match(/(?<!\S)[0-9]/))
    {
        nickInput.focus();
        event.preventDefault();
        error.innerText="El campo de nick no puede comenzar con un numero";
        return false;
    }else if(dificultadInput.value == "0"){
        dificultadInput.focus();
        event.preventDefault();
        error.innerText="Se debe seleccionar una dificultad";
        return false;
    }else if(numCartasInput.value == "0"){
        numCartasInput.focus();
        event.preventDefault();
        error.innerText="Se debe seleccionar un número de cartas";
        return false;
    }
    datosUsuario(nickInput, emailInput, dificultadInput, numCartasInput, avatarCont);
    return true;
}

/**
 * Detección del movimiento de la imagen Avatar
 * @date 2023-12-21
 * @param { * } event
 */
function moviendoComponente(event){
    itemImg=event.target;
}


/**
 * Cambio de la imagen Avatar
 * @date 2023-12-21
 * @param { * } event
 */
function soltarComponenete(event){
    avatarCont.src = itemImg.src;
}


/**
 * Carga de los objetos del DOM y eventos del formulario
 * @date 2023-12-21
 */
function domCargado(){

    // Captura de los Elementos
    nickInput = document.getElementById("nick");
    emailInput = document.getElementById("email");
    dificultadInput = document.getElementById("dificultad");
    numCartasInput = document.getElementById("numCartas");
    formEntrada = document.getElementById("formularioEntrada");
    error = document.getElementById("error");

    //Comprobar si hay algún error de juego.html
    if(sessionStorage.getItem('error')!=null)
    {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    formEntrada.addEventListener('submit',comprobarForm);

    // Eventos de D&D
    componenteItems=document.getElementsByClassName("avatarImgItem");
    
    for(let item of componenteItems){
        item.addEventListener('dragstart',moviendoComponente)
        item.removeEventListener('dragover',e=>{e.preventDefault()});
        item.removeEventListener('drop', soltarComponenete);
    }

    avatarCont = document.getElementById("avatarImg");
    avatarCont.addEventListener('dragover',e=>{e.preventDefault()});
    avatarCont.addEventListener('drop', soltarComponenete);

    leerHistoricos();
}


/**
 * Lectura de todos los historicos.
 * @date 2023-12-22
 */
function leerHistoricos(){
    let hists = leerHistorico("historicoF8");
    let cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla0").innerHTML = cad;
    }
    hists = leerHistorico("historicoF16");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla1").innerHTML = cad;
    }
    hists = leerHistorico("historicoF24");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla2").innerHTML = cad;
    }
    hists = leerHistorico("historicoM8");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla3").innerHTML = cad;
    }
    hists = leerHistorico("historicoM16");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla4").innerHTML = cad;
    }
    hists = leerHistorico("historicoM24");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla5").innerHTML = cad;
    }
    hists = leerHistorico("historicoD8");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla6").innerHTML = cad;
    }
    hists = leerHistorico("historicoD16");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla7").innerHTML = cad;
    }
    hists = leerHistorico("historicoD24");
    cad = "";
    if(hists != null){
        for(let i of hists){
            cad += `<tr><td><p>${i.usuario} ${i.puntos}  - ${i.tiempo} </p></td></tr>`;
        }
        document.getElementById("tabla8").innerHTML = cad;
    }
}

// Inicio de Eventos
document.addEventListener('DOMContentLoaded',domCargado);