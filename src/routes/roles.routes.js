import Routes from "express"
import {AddRol,rolUpdate, getAllRoles , rolUser} from "../controllers/roles.controller.js"

const rolesRoutes = Routes();

//get all routes

rolesRoutes.get('/rol', getAllRoles)

rolesRoutes.post("/rol/add", AddRol)

rolesRoutes.put('/rol/update/:id', rolUpdate)

rolesRoutes.get('/rol/users/:id', rolUser)

export default rolesRoutes