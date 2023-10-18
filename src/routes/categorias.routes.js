import express from "express"
import {addCat, getCat, delCat, updCat} from "../controllers/categorias.controller.js"

const routesCat = express();

routesCat.post('/categorias/add', addCat)

routesCat.get('/categorias', getCat)

routesCat.delete('/categorias/delete/:id', delCat)

routesCat.put('/categorias/update/:id', updCat)

export default routesCat