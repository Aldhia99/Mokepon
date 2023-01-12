const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static("public"))
app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }
}

class Mokepon{
    constructor(index){
        this.index = index
    }
}

app.post("/mokepon/:jugadorId",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const index = req.body.mokepon || 0
    const mokepon = new Mokepon(index)
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if (jugadorIndex>=0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if (jugadorIndex>=0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigosj = jugadores.filter((jugador)=>jugadorId!==jugador.id)

    res.send({
        enemigosj
    })
})

app.get("/unirse",(req,res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(id)
})

app.listen(8080,() => {
    console.log("Servidor funcionando")
})
