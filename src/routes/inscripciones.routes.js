import express from "express"
import {addInsc, getInsc, delInsc} from "../controllers/inscripciones.controller.js"

const inscRoutes = express()

inscRoutes.get('/inscripciones', getInsc)

inscRoutes.post('/inscripciones/add', addInsc)

//delete inscriptions

inscRoutes.delete('/inscripciones/delete/:idu/:idc', delInsc)

export default inscRoutes