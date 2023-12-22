/*
*    JS Tienda de Componenetes
*   @author Carlos Vílchez <carlos.e.v.d@gmail.com>
*/

// Variables
var tiempo;
var numTotalCartas;
var tipoCarta1;
var tipoCarta2;
var idCarta1;
var idCarta2;
var puntos;
var puntuacionInput;
var idInterval;
var contParejas;
var contTiempo;

// Funciones

/**
 * Obtenemos el nick y el avatar
 * @date 2023-12-21
 */
function rellenarFormularioUsuario(){
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
    tiempo = parseInt(dificultad);
    numTotalCartas = parseInt(numCartas);
}

/* INICIALIZACIÓN DEL PANEL */
/**
 * Devuelve un numero random entre 0 y max
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param  {} max
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Creación del panel con las cartas e inicialización de los distintos valores.
 * @date 2023-12-22
 */
function pintarPanelJuego(){
    document.getElementById("juego").style.width = 4 * 150;
    document.getElementById("juegoAcabado").style.height = (numTotalCartas/4) * 222;
    let cartas = [];
    let tipos =["agua", "fuego", "lucha", "planta", "psiquico", "rayo"]
    for(let i = 0; i < (numTotalCartas / 2); i++){
        let rng = getRandomInt(6);
        cartas.push(`<div class="containerItem"><div id="${i}" ><img src="./img/tcg-card-back.jpg" class="carta energia ${tipos[rng]}" alt="" width="125"></div></div>`);
        cartas.push(`<div class="containerItem"><div id="${i + (numTotalCartas / 2)}"><img src="./img/tcg-card-back.jpg"  class="carta pokemon ${tipos[rng]}" alt="" width="125"></div></div>`);
    }

    let cartas2 = [];
    let textoCartas = "";
    while(cartas2.length < numTotalCartas ){
        let rng = getRandomInt(numTotalCartas);
        if(!cartas2.includes(rng)) {
            cartas2.push(rng);
            textoCartas += cartas[rng];
        }
    }

    tipoCarta1 = 0;
    tipoCarta2 = 0;
    contParejas = 0;
    puntuacionInput = document.getElementById("puntuacion");
    puntos = 0;
    document.getElementById("tmpo").value = tiempo;
    document.getElementById("tiempoTotal").value = 0;
    puntuacionInput.value = puntos;
    document.getElementById("juego").innerHTML = textoCartas;
    document.getElementById("intentos").value = (numTotalCartas/4);
    mostrarCartas();
}

/**
 * Mostrar las cartas en el inicio
 * @date 2023-12-22
 */
function mostrarCartas(){
    console.log("mostrando");
    for(let i = 0; i < numTotalCartas; i++){
        let cartaContainer = document.getElementById(i);
        let carta = cartaContainer.childNodes[0];
        carta.src = getImagenCarta(carta.classList[1], carta.classList[2]);
    }
    let count = 5;
    const timer = setInterval(function() {
        count--;
        if (count == 0) {
            clearInterval(timer);
            console.log("Time's up!");
            for(let i = 0; i < numTotalCartas; i++){
                let cartaContainer = document.getElementById(i);
                let carta = cartaContainer.childNodes[0];;
                carta.src = "./img/tcg-card-back.jpg";
            }
            programarEventosJuego();
        }
      }, 1000);
      
}

/**
 * Obtención de las imágenes de las cartas
 * @date 2023-12-22
 * @param { * } clase1
 * @param { * } clase2
 */
function getImagenCarta(clase1, clase2){
    if(clase1 == "energia"){
        switch (clase2){
            case "agua":
                return "./img/Energía_Agua_Básica.png";       
            case "fuego":
                return "./img/Energía_Fuego_Básica.png";   
            case "lucha":
                return "./img/Energía_Lucha_Básica.png";  
            case "planta":
                return "./img/Energía_Planta_Básica.png";    
            case "psiquico":
                return "./img/Energía_Psíquica_Básica.png";  
            case "rayo":
                return "./img/Energía_Rayo_Básica.png";   
        }
    } else{
        switch (clase2){
            case "agua":
                return "./img/magikarp.png";  
            case "fuego":
                return "./img/growlithe.png";   
            case "lucha":
                return "./img/farfetchd.png";  
            case "planta":
                return "./img/cartepie.png";   
            case "psiquico":
                return "./img/dreepy.png";   
            case "rayo":
                return "./img/voltorb.png";  
        }
    }     
}

/**
 * Programación de los eventos del juego
 * @date 2023-12-22
 */
function programarEventosJuego(){
    const energias = document.getElementsByClassName('energia');
    const pokemon = document.getElementsByClassName('pokemon');
    for (let i = 0; i < energias.length; i++) {
        energias[i].addEventListener('mousedown',comenzarMarcar);
        pokemon[i].addEventListener('mousedown',comenzarMarcar);
        energias[i].addEventListener('mouseup',comprobacionMarcados);
        pokemon[i].addEventListener('mouseup',comprobacionMarcados);
    }
    contTiempo = setInterval(contarTiempo, 1000);
}

/**
 * Volteo de la carta
 * @date 2023-12-22
 * @param { * } event
 */
function comenzarMarcar(event){
    let carta = event.target;
    contTiempo = true;
    carta.removeEventListener('mousedown',comenzarMarcar);
    carta.src = getImagenCarta(carta.classList[1], carta.classList[2]);
    let tipo = carta.classList[2];
    if(tipoCarta1 == 0){        
        clearInterval(idInterval);
        document.getElementById("tmpo").value = tiempo;
        idInterval=setInterval(cuentaAtras,1000);
    }
    if(carta.classList[1] == "energia"){
        switch (tipo){
            case "agua":                    
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 1;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 1;
                }                         
            break;
            case "fuego":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 2;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 2;
                }    
            break;
            case "lucha":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 3;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 3;
                }    
            break;
            case "planta":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 4;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 4;
                }    
            break;
            case "psiquico":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 5;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 5;
                }    
            break;
            case "rayo":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 6;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 6;
                }    
            break;
        }
    } else{
        switch (tipo){
            case "agua":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 7;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 7;
                }    
            break;
            case "fuego":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 8;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 8;
                }    
            break;
            case "lucha":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 9;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 9;
                }    
            break;
            case "planta":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 10;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 10;
                }    
            break;
            case "psiquico":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 11;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 11;
                }    
            break;
            case "rayo":
                if(tipoCarta1 == 0) {
                    idCarta1 = carta;
                    tipoCarta1 = 12;
                }
                else{
                    idCarta2 = carta;
                    tipoCarta2 = 12;
                }    
            break;
        }
    }    
}

/**
 * Comrpobación de las dos cartas
 * @date 2023-12-22
 */
function comprobacionMarcados(){
    if(tipoCarta2 != 0){
        if((tipoCarta1 == 1 && tipoCarta2 == 7) || (tipoCarta2 == 1 && tipoCarta1 == 7)){
            puntos += 5;
            puntuacionInput.value = puntos;
            contParejas++;
        } else if((tipoCarta1 == 2 && tipoCarta2 == 8) || (tipoCarta2 == 2 && tipoCarta1 == 8)){
            puntos += 5;
            puntuacionInput.value = puntos;
            contParejas++;
        } else if((tipoCarta1 == 3 && tipoCarta2 == 9) || (tipoCarta2 == 3 && tipoCarta1 == 9)){
            puntos += 5;
            puntuacionInput.value = puntos;
            contParejas++;
        } else if((tipoCarta1 == 4 && tipoCarta2 == 10) || (tipoCarta2 == 4 && tipoCarta1 == 10)){
            puntos += 5;
            puntuacionInput.value = puntos;
            contParejas++;
        } else if((tipoCarta1 == 5 && tipoCarta2 == 11) || (tipoCarta2 == 5 && tipoCarta1 == 11)){
            puntos += 5;
            puntuacionInput.value = puntos;
            contParejas++;
        } else if((tipoCarta1 == 6 && tipoCarta2 == 12) || (tipoCarta2 == 6 && tipoCarta1 == 12)){
            puntos += 5;
            puntuacionInput.value = puntos;
            contParejas++;
        } else {
            idCarta1.src = "./img/tcg-card-back.jpg";
            idCarta2.src = "./img/tcg-card-back.jpg";
            idCarta1.addEventListener('mousedown',comenzarMarcar);
            idCarta2.addEventListener('mousedown',comenzarMarcar);
            let inte = document.getElementById("intentos").value - 1;
            document.getElementById("intentos").value = inte;
            if(inte == 0) finJuego();
        }
        tipoCarta1 = 0;
        tipoCarta2 = 0;
        clearInterval(idInterval);
        
        console.log(contParejas);
        if(contParejas == (numTotalCartas/2)) {
            finJuego();
            historicoUsuarios(document.getElementById("nick").value, tiempo, numTotalCartas, document.getElementById("puntuacion").value, document.getElementById("tiempoTotal").value);
        }
    }
}

/**
 * Cuenta regresiva al voltear la primera carta
 * @date 2023-12-22
 */
function cuentaAtras(){
    let tmpoRestante = parseInt(document.getElementById("tmpo").value)-1;
        document.getElementById("tmpo").value = tmpoRestante;
        if(tmpoRestante == 0){
            clearInterval(idInterval);
            if(tipoCarta2 == 0){
                idCarta1.addEventListener('mousedown',comenzarMarcar);
                idCarta1.src = "./img/tcg-card-back.jpg";
                tipoCarta1 = 0;
            } 
            
            let inte = document.getElementById("intentos").value - 1;
            document.getElementById("intentos").value = inte;
            if(inte == 0) finJuego();
        }
}

/**
 * Cuenta total de la partida
 * @date 2023-12-22
 */
function contarTiempo(){
    let tmpoRestante = parseInt(document.getElementById("tiempoTotal").value) + 1;
    document.getElementById("tiempoTotal").value = tmpoRestante;        
}

/**
 * Abertura de la finalización del tiempo y escritura del historico
 * @date 2023-12-22
 */
function finJuego(){
    clearInterval(contTiempo);
    const energias = document.getElementsByClassName('energia');
    const pokemon = document.getElementsByClassName('pokemon');
    for (let i = 0; i < energias.length; i++) {
        energias[i].removeEventListener('mousedown',comenzarMarcar);
        pokemon[i].removeEventListener('mousedown',comenzarMarcar);
        energias[i].removeEventListener('mouseup',comprobacionMarcados);
        pokemon[i].removeEventListener('mouseup',comprobacionMarcados);
    }
    document.getElementById("juegoAcabado").style.display = "flex";
    document.getElementById("juego").style.display = "none";
    document.getElementById("juegoAcabado").classList.add('juegoAcabadoColor');
    document.getElementById("nuevaPartida").addEventListener("click",(e)=>location.reload());
    escribirHistorico();
}

/**
 * Escribir historico en el hmtl juego
 * @date 2023-12-22
 */
function escribirHistorico(){
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

 //Capturamos Datos Usuaio
getDatosUsuarios();
//Comprobamos los datos
if(!comprobacionDatosUsuario()) location="index.html";
//Rellenamos el formulario, panel y eventos
rellenarFormularioUsuario();
pintarPanelJuego();