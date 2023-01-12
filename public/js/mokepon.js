//Inicializacion

//Selectores seccion seleccionar mascota
let sectionSeleccionarMascotas = document.getElementById("seleccionar-mascota")

let divTarjetasMascotas = document.getElementById("tarjetas-mascotas")
let inputsMascotas = []

let botonMascotaJugador = document.getElementById("boton-mascota")

//Selectores seccion ver mapa

let sectionVerMapa = document.getElementById("ver-mapa")
let mapa = document.getElementById("mapa")

//Selectores seccion seleccionar ataques
let sectionSeleccionarAtaques = document.getElementById("seleccionar-ataque")

let divBotonesJugador = document.getElementById("botones-jugador")
let botonesAtaques = []

let mensajes = document.getElementById("mensajes")
let resultadoBatalla = document.getElementById("resultado-batalla")
let botonReiniciar = document.getElementById("boton-reiniciar")
let botonContinuar = document.getElementById("boton-continuar")

let spanMascotaJugador = document.getElementById("mascota-jugador")
let imgMascotaJugador = document.getElementById("img-jugador")
let spanVidasEnemigo = document.getElementById("vida-enemigo")

let divAtaquesJugador = document.getElementById("ataques-jugador")

let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
let imgMascotaEnemigo = document.getElementById("img-enemigo")
let spanVidasJugador = document.getElementById("vida-jugador")

let divAtaquesEnemigo = document.getElementById("ataques-enemigo")

let lienzo = mapa.getContext("2d")
let imgMapa = new Image()
imgMapa.src = "./assets/mokemap.png"
let interval 


class Propiedad {
    constructor(nombre, color, colorBorde, emoji) {
        this.nombre = nombre
        this.color = color
        this.colorBorde = colorBorde
        this.emoji = emoji
    }
}
class Ataque {
    constructor(nombre, propiedad) {
        this.nombre = nombre
        this.propiedad = propiedad
        this.id = nombre.replace(/\s/g, '-').toLowerCase()
        this.propiedadId = propiedad.nombre.toLowerCase()
    }
}

class Vector2D{
    constructor(x=0,y=0){
        this.x = x
        this.y = y
    }

    lenghtsqr(){
        return this.x*this.x+this.y*this.y
    }

    lenght(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }

    scaleto(lenght){
        let reason = this.lenght()/lenght
        console.log(this.lenght())
        this.x/=reason
        this.y/=reason
    }
}

class Mokepon {
    constructor(nombre, vida, propiedad, ataque,x=0,y=0) {
        this.index
        this.nombre = nombre
        this.foto = "./assets/" + nombre + ".png"
        this.vida = vida
        this.propiedad = propiedad
        this.ataques = ataque
        this.imagen = new Image()
        this.imagen.src = this.foto
        this.x = x
        this.y = y
        this.w = 100
        this.h = 100
        this.velocidad = 5
    }

    actualizar(event){
        let key = event.key
        switch (key) {
            case "ArrowUp":
                this.y -= this.velocidad
                break;
            case "ArrowDown":
                this.y += this.velocidad
                break;
            case "ArrowLeft":
                this.x -= this.velocidad
                break;
            case "ArrowRight":
                this.x += this.velocidad
                break;
            default:
                break;
        }
    }

    pintar(){
        lienzo.drawImage(this.imagen,this.x,this.y,this.w,this.h)
    }
}

class Jugador {
    constructor() {
        this.mascota
        this.id
    }
}

class Enemigo {
    constructor(id) {
        this.mascota
        this.id = id
    }
}

function crearPropiedades() {
    const dictPropiedades = {
        "AGUA": ["rgb(100, 193, 255)", "rgb(21, 124, 192)", "💧"],
        "FUEGO": ["rgb(231, 142, 142)", "rgb(194, 15, 15)", "🔥"],
        "TIERRA": ["rgb(162, 255, 143)", "rgb(47, 163, 24)", "🌱"]
    }
    let listaPropiedades = []
    for (const propiedad in dictPropiedades) {
        let nombrePropiedad = propiedad
        let colorPropiedad = dictPropiedades[propiedad][0]
        let colorBordePropiedad = dictPropiedades[propiedad][1]
        let emojiPropiedad = dictPropiedades[propiedad][2]
        listaPropiedades.push(new Propiedad(nombrePropiedad, colorPropiedad, colorBordePropiedad, emojiPropiedad))
    }
    return listaPropiedades
}

function crearAtaques(propiedades) {
    const dictAtaques = {
        "Chorro de agua": [propiedades[0]],
        "Llamarada": [propiedades[1]],
        "Lanzar roca": [propiedades[2]]
    }
    let listaAtaques = []
    for (const ataque in dictAtaques) {
        let nombreAtaque = ataque
        let propiedadAtaque = dictAtaques[ataque][0]
        listaAtaques.push(new Ataque(nombreAtaque, propiedadAtaque))
    }
    return listaAtaques
}

function crearMokepones(propiedades, ataques) {
    const dictMokepones = [
         ["Hipodoge", 3, propiedades[0], [ataques[0],ataques[0]]],
         ["Capipepo",3, propiedades[2], [ataques[2]]],
         ["Ratigueya",3, propiedades[1], [ataques[1], ataques[2]]]
    ]
    return dictMokepones
}

function crearMokepon(mokepon,x=0,y=0) {
    let nombreMascota = mokepon[0]
    let vidasMascota = mokepon[1]
    let propiedadMascota = mokepon[2]
    let ataquesMascota = mokepon[3]
    let selMokepon = new Mokepon(nombreMascota, vidasMascota, propiedadMascota, ataquesMascota,x,y)
    return selMokepon
}

function crearBotonesMascotas(mokepones) {
    for (let index = 0; index < mokepones.length; index++) {
        let mascota = mokepones[index];

        let inputMascotas = document.createElement("input")
        inputMascotas.type = "radio"
        inputMascotas.name = "mascotas"
        inputMascotas.id = mascota.nombre

        let labelMascotas = document.createElement("label")
        labelMascotas.htmlFor = mascota.nombre
        labelMascotas.className = "tarjeta-mokepon"
        labelMascotas.innerHTML = '<p>' + mascota.nombre + " " + mascota.propiedad.emoji + '</p>'


        let imgMascotas = document.createElement("img")
        imgMascotas.src = mascota.foto
        imgMascotas.alt = mascota.nombre
        labelMascotas.appendChild(imgMascotas)

        divTarjetasMascotas.appendChild(inputMascotas)
        divTarjetasMascotas.appendChild(labelMascotas)
        inputsMascotas.push(inputMascotas)
    }
}

/* function crearBotonesMascotas(mokepon){
    const crearBotonesMascotas = `
        <input type="radio" name="mascotas" id=${mokepon.nombre} />
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre+" "+mokepon.propiedad.emoji}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
    `
    divTarjetasMascotas.innerHTML += crearBotonesMascotas;
    let tarjeta = document.getElementById(mokepon.nombre)
    inputsMascotas.push(tarjeta)
    console.log(inputsMascotas)
} */

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Eventos
function seleccionarMascotaJugador(mokepones, jugador, enemigos) {
    let inputChecked = false
    for (let index = 0; index < inputsMascotas.length; index++) {
        let inputMascota = inputsMascotas[index]
        if (inputMascota.checked) {
            mascotaSeleccionada = mokepones[index]
            jugador.mascota = crearMokepon(mascotaSeleccionada)
            jugador.mascota.index = index
            spanMascotaJugador.innerHTML = jugador.mascota.nombre
            imgMascotaJugador.src = jugador.mascota.foto
            inputChecked = true
            spanVidasJugador.innerHTML = jugador.mascota.vida
        }
    }
    if (inputChecked) {
        seleccionarMokepon(jugador.mascota)
        //crearEnemigos(mokepones, enemigos)
        sectionVerMapa.style.display = "flex"
        sectionSeleccionarMascotas.style.display = "none"
        iniciarMapa()
    } else {
        alert("¡Selecciona una mascota primero!")
    }
}

function seleccionarMokepon(mascota){
    fetch(`http://localhost:8080/mokepon/${jugador.id}`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascota.index
        })
    })
}

function crearEnemigos(mokepones,enemigos){
    let numeroEnemigos = aleatorio(3,5)
    for (let i = 0; i < numeroEnemigos; i++) {
        let enemigo = new Enemigo()
        seleccionarMascotaEnemigo(mokepones,enemigo)
        enemigos.push(enemigo)                
    }
}

function seleccionarMascotaEnemigo(mokepones, enemigo) {
    let aleatorioMascotaEnemigo = aleatorio(0, mokepones.length - 1)
    let aleatorioPosicionX = aleatorio(0,300)
    let aleatorioPosicionY = aleatorio(0,200)
    mascotaSeleccionada = mokepones[aleatorioMascotaEnemigo]
    enemigo.mascota = crearMokepon(mascotaSeleccionada,aleatorioPosicionX,aleatorioPosicionY)
}

function moverJugador(event){
    jugador.mascota.actualizar(event)
}

function iniciarMapa(){
    mapa.width = 400
    mapa.height = 300
    interval = setInterval(pintarLienzo,500)
    window.addEventListener('keydown',moverJugador)
    //window.addEventListener('keyup',moverJugador)
}

function pintarLienzo(){
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(imgMapa,0,0,mapa.width,mapa.height)
    jugador.mascota.pintar()
    enviarPosicion(jugador.mascota.x,jugador.mascota.y)
    enemigos.forEach(enemigo => {
        enemigo.mascota.pintar()
        //revisarColision(jugador,enemigo)
    })
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugador.id}/posicion`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({enemigosj}){
                        console.log(enemigos)
                        enemigosj.forEach(function(enemigoj){
                            let checkEne = enemigoExiste(enemigoj)
                            console.log(checkEne,enemigoj.mokepon)
                            if (checkEne === null && enemigoj.mokepon!==undefined){
                                let ene = new Enemigo(enemigoj.id)
                                ene.mascota =  crearMokepon(mokepones[enemigoj.mokepon.index],enemigoj.x,enemigoj.y)
                                console.log(ene)
                                enemigos.push(ene)
                            } else if (checkEne !== null) {
                                checkEne.mascota.x = enemigoj.x
                                checkEne.mascota.y = enemigoj.y
                            } 
                        }) 
                    })
                }
            })
        }

function enemigoExiste(enemigoj){
    let existencia = null
    enemigos.forEach(enemigo => {
        if(enemigo.id === enemigoj.id){
            existencia = enemigo
        }
    })
    return existencia
}

function revisarColision(jugador,enemigo){
    const abajoJugador = jugador.mascota.y + jugador.mascota.h
    const arribaJugador = jugador.mascota.y
    const derechaJugador = jugador.mascota.x + jugador.mascota.w
    const izquierdaJugador = jugador.mascota.x

    const abajoEnemigo = enemigo.mascota.y + enemigo.mascota.h
    const arribaEnemigo = enemigo.mascota.y
    const derechaEnemigo = enemigo.mascota.x + enemigo.mascota.w
    const izquierdaEnemigo = enemigo.mascota.x

    if(abajoJugador < arribaEnemigo || arribaJugador > abajoEnemigo 
        || derechaJugador < izquierdaEnemigo || izquierdaJugador > derechaEnemigo){
            return
        }
    
    desactivarMovimiento()
    iniciarCombate(enemigo)
    sectionVerMapa.style.display = "none"
    sectionSeleccionarAtaques.style.display = "flex"
    clearInterval(interval)
}

function desactivarMovimiento(){
    window.removeEventListener('keydown',moverJugador)
    //window.removeEventListener('keyup',moverJugador)
}

function iniciarCombate(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.mascota.nombre
    imgMascotaEnemigo.src = enemigo.mascota.foto
    spanVidasEnemigo.innerHTML = enemigo.mascota.vida
    crearBotonesAtaque(jugador, enemigo)
}

function crearBotonesAtaque(jugador, enemigo) {
    let ataquesJugador = jugador.mascota.ataques
    for (let index = 0; index < ataquesJugador.length; index++) {
        let ataque = ataquesJugador[index];

        let botonAtaque = document.createElement("button")
        botonAtaque.id = "boton-" + ataque.propiedadId
        botonAtaque.className = "boton-ataque"
        botonAtaque.innerHTML = ataque.nombre + " " + ataque.propiedad.emoji
        botonAtaque.addEventListener("click", function () { turnoJugador(ataque, jugador, enemigo) })

        divBotonesJugador.appendChild(botonAtaque)
        botonesAtaques.push(botonAtaque)
    }
}


function turnoJugador(ataqueJugador, jugador, enemigo) {
    let vidasJugador = jugador.mascota.vida
    let vidasEnemigo = enemigo.mascota.vida
    if (vidasEnemigo > 0 && vidasJugador > 0) {
        let ataqueEnemigo = turnoEnemigo(enemigo)
        elementoEnemigo = ataqueEnemigo.propiedad.nombre
        elementoJugador = ataqueJugador.propiedad.nombre
        agregarAtaques(ataqueJugador, ataqueEnemigo)
        elegirGanador(elementoJugador, elementoEnemigo, jugador, enemigo)
        actualizarVidas(jugador, enemigo)
        vidasJugador = jugador.mascota.vida
        vidasEnemigo = enemigo.mascota.vida
    } 
    if (vidasEnemigo == 0 || vidasJugador == 0) {
        determinarGanador(enemigo)
    }
}

function turnoEnemigo(enemigo) {
    let ataquesEnemigo = enemigo.mascota.ataques
    let aleatorioAtaqueEnemigo = aleatorio(0, ataquesEnemigo.length - 1)
    return ataquesEnemigo[aleatorioAtaqueEnemigo]
}

function agregarAtaques(ataqueJugador, ataqueEnemigo) {
    let historialJugador = document.createElement("p")
    let historialEnemigo = document.createElement("p")

    historialJugador.innerHTML = ataqueJugador.nombre + " " + ataqueJugador.propiedad.emoji
    historialEnemigo.innerHTML = ataqueEnemigo.nombre + " " + ataqueEnemigo.propiedad.emoji

    divAtaquesJugador.appendChild(historialJugador)
    divAtaquesEnemigo.appendChild(historialEnemigo)
    divAtaquesJugador.scrollTop = divAtaquesJugador.scrollHeight
    divAtaquesEnemigo.scrollTop = divAtaquesEnemigo.scrollHeight
}

function elegirGanador(elementoJugador, elementoEnemigo, jugador, enemigo) {
    let mensaje, colorMensajes
    if (elementoJugador == elementoEnemigo) {
        mensaje = "EMPATASTE 😐"
        colorMensajes = "rgb(242, 245, 169)"
    } else if (elementoJugador == "TIERRA" && elementoEnemigo == "AGUA" || elementoJugador == "AGUA" && elementoEnemigo == "FUEGO" || elementoJugador == "FUEGO" && elementoEnemigo == "TIERRA") {
        mensaje = "GANASTE 🎉"
        enemigo.mascota.vida--
        colorMensajes = "rgb(195, 255, 184)"
    } else {
        mensaje = "PERDISTE 😢"
        jugador.mascota.vida--
        colorMensajes = "rgb(255, 173, 173)"
    }
    resultadoBatalla.innerHTML = mensaje
    mensajes.style.backgroundColor = colorMensajes
}

function determinarGanador(enemigo) {
    let mensaje, colorMensajes
    let vidasJugador = jugador.mascota.vida
    let vidasEnemigo = enemigo.mascota.vida
    if (vidasEnemigo == 0) {
        mensaje = "Ganaste!!!"
        colorMensajes = "rgb(127, 255, 123)"
        const index = enemigos.indexOf(enemigo)
        enemigos.splice(index,1)
        botonesAtaques.forEach(boton => {
            boton.disabled = "true"
        });
        if (enemigos.length>0){
            botonContinuar.style.display = "flex"
        } else {
            botonReiniciar.style.display = "flex"
        }
    } else if (vidasJugador == 0) {
        mensaje = "Perdiste"
        colorMensajes = "rgb(255, 83, 83)"
        botonReiniciar.style.display = "flex"
        botonesAtaques.forEach(boton => {
            boton.disabled = "true"
        });
    }
    resultadoBatalla.innerHTML = mensaje
    mensajes.style.backgroundColor = colorMensajes

}

function actualizarVidas(jugador, enemigo) {
    spanVidasJugador.innerHTML = jugador.mascota.vida
    spanVidasEnemigo.innerHTML = enemigo.mascota.vida
}

function reiniciarJuego() {
    location.reload()
}

function continuarJuego(){
    sectionSeleccionarAtaques.style.display = "none"
    sectionVerMapa.style.display = "flex"
    limpiarAtaques()
    iniciarMapa()
}

function limpiarAtaques(){
    divBotonesJugador.innerHTML = ""
    botonContinuar.style.display = "none"
    divAtaquesEnemigo.innerHTML = ""
    divAtaquesJugador.innerHTML = ""
    resultadoBatalla.innerHTML = "¡Que comience la batalla!"
    mensajes.style.backgroundColor = "rgb(231, 247, 255)"
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugador.id = respuesta
                    })
            }
        })
}

let propiedades = crearPropiedades()
let ataques = crearAtaques(propiedades)
let mokepones = crearMokepones(propiedades, ataques)
let shallowMokepones = []
mokepones.forEach(mokepon => {
    shallowMokepones.push(crearMokepon(mokepon))
});
crearBotonesMascotas(shallowMokepones)
let jugador = new Jugador()
let enemigos = []

unirseAlJuego()

//mokepones.forEach((mokepon) => crearBotonesMascotas(mokepon))

botonMascotaJugador.addEventListener("click", function () { seleccionarMascotaJugador(mokepones, jugador, enemigos) })
botonReiniciar.addEventListener("click", reiniciarJuego)
botonContinuar.addEventListener("click", continuarJuego)