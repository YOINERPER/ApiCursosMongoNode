import express from "express";
import {addAprendiz, updtApr, getApr, delApr} from '../controllers/aprendices.controller.js'

const aprRoutes = express();

aprRoutes.get('/aprendices', getApr)

aprRoutes.post('/aprendices/add', addAprendiz)

aprRoutes.put('/aprendices/update/:id',updtApr)

aprRoutes.delete('/aprendices/delete/:id', delApr)

export default aprRoutes