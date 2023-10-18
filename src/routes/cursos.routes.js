import express from "express"
import {addCurso, getCursos} from "../controllers/cursos.controller.js"

const curRoutes = express()

curRoutes.post('/cursos/add',addCurso)

curRoutes.get('/cursos', getCursos)
export default curRoutes