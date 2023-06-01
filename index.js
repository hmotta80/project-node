const express = require("express")
const uuid = require("uuid")
const app = express()

app.use(express.json())

const usuario = []



app.use(myFirstMiddleware)

app.get("/client", (request, response) => {
    
    return response.json(usuario)

})



app.post("/client", (request, response) => {
  
    const name = request.body.nome
    const sex = request.body.sexo


    const update = { id: uuid.v4(), nome: name, sexo: sex }

    usuario.push(update)

    return response.json(update)
})

app.put("/client/:id", (request, response) => {

    const { id } = request.params
    const name = request.body.nome
    const sex = request.body.sexo

    const newUser = { id, nome: name, sexo: sex }

    const position = usuario.findIndex(user => user.id === id)

    if (position < 0) {
        return response.status(404).send("User not found")
    }

    usuario[position] = newUser

    return response.json(newUser)
})



app.delete("client/:id", (response, request) => {
    const { id } = request.params

    const position = usuario.findIndex(user => user.id === id)

    if (position < 0) {
        return response.status(404).send("User not found")
    }

    usuario.splice(position, 1)

    return response.status(204)
})






app.listen(3000)