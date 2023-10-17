import express from "express"
import {addCentro, getCentros, updCenter, delCenter} from "../controllers/centros.controller.js"

const cenRoutes = express()

cenRoutes.post('/centros/add', addCentro)

cenRoutes.get('/centros', getCentros)

cenRoutes.put('/centros/update/:id', updCenter)

cenRoutes.delete('/centros/delete/:id',delCenter )

export default cenRoutes