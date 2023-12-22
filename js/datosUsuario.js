/*
* JS Para la gestión de los datos de usuario
*
* @author Carlos Vílchez <carlos.e.v.d@gmail.com>
* 
*/

// Variables
var nick;
var email;
var dificultad;
var numCartas;
var avatarImg;

// Funciones

/**
 * Almacenamiento de los datos del usuario en el sessionStorage
 * @date 2023-12-21
 * @param { * } nick
 * @param { * } email
 * @param { * } dificultad
 * @param { * } numCartas
 * @param { * } avatarCont
 */
function datosUsuario(nick, email, dificultad, numCartas, avatarCont){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('dificultad', dificultad.value);
    sessionStorage.setItem('numCartas', numCartas.value);
    sessionStorage.setItem('avatarImg',avatarCont.src);
}

/**
 * Recogida de los datos del sessionStorage
 * @date 2023-12-21
 */
function getDatosUsuarios(){
    nick = sessionStorage.getItem('nick');
    email = sessionStorage.getItem('email');
    dificultad = sessionStorage.getItem('dificultad');
    numCartas = sessionStorage.getItem('numCartas');
    avatarImg = sessionStorage.getItem('avatarImg');
}

/**
 * Comprobar si los datos del usuario son correctos.
 * @date 2023-12-22
 */
function comprobacionDatosUsuario(){
    if(nick == null){
        sessionStorage.setItem('error','No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}

/**
 * Almacenamiento de los resultados de las partidas por dificultad y tamaño.
 * @date 2023-12-22
 * @param { * } nick
 * @param { * } dificultadPartida
 * @param { * } numCartas
 * @param { * } puntosTotales
 * @param { * } tiempoTotal
 */
function historicoUsuarios(nick, dificultadPartida, numCartas, puntosTotales, tiempoTotal,){
    let histNombre = "historico";

    if(dificultadPartida == 5) histNombre +="F";
    else if(dificultadPartida == 3) histNombre +="M";
    else  histNombre +="D;"

    if(numCartas == 8) histNombre += "8";
    else if(numCartas == 16) histNombre += "16";
    else histNombre += "20";

    let historicoStorage = localStorage.getItem(histNombre);
    let historico;
    if(historicoStorage == null){
        historico = [];
    }else{
        historico = JSON.parse(historicoStorage);
    }
    let registroUsuario={
        usuario : nick,
        puntos: puntosTotales,
        tiempo: tiempoTotal
    }
    historico.push(registroUsuario);
    localStorage.setItem(histNombre, JSON.stringify(historico));
}

/**
 * Obtención del historico.
 * @date 2023-12-22
 * @param { * } historico
 */
function leerHistorico(historico){    
    let historicoStorage = localStorage.getItem(historico);
    return JSON.parse(historicoStorage);
}