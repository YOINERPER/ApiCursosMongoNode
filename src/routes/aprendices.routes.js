import express from "express";
import {addAprendiz, updtApr} from '../controllers/aprendices.controller.js'

const aprRoutes = express();

aprRoutes.post('/aprendices/add', addAprendiz)

aprRoutes.put('/aprendices/update/:id',updtApr)

export default aprRoutes