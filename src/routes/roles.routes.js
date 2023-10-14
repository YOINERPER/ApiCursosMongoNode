import Routes from "express"
import {AddRol,rolUpdate, getAllRoles} from "../controllers/roles.controller.js"

const rolesRoutes = Routes();

//get all routes

rolesRoutes.get('/rol', getAllRoles)

rolesRoutes.post("/rol/add", AddRol)

rolesRoutes.put('/rol/update/:id', rolUpdate)



export default rolesRoutes