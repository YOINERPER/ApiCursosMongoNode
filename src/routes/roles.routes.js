import Routes from "express"
import {AddRol,rolUpdate, getAllRoles , rolUser, RolDelete} from "../controllers/roles.controller.js"

const rolesRoutes = Routes();

//get all routes
rolesRoutes.get('/rol', getAllRoles)

// add new rol
rolesRoutes.post("/rol/add", AddRol)

//update rol
rolesRoutes.put('/rol/update/:id', rolUpdate)

//get users by rol id
rolesRoutes.get('/rol/users/:id', rolUser)

//delete rol
rolesRoutes.delete('/rol/delete/:id', RolDelete)

export default rolesRoutes