import { Router } from "express"
import {getAllUsers, AddUser, UpdateUser, DeleteUser, getUser,userTypes, loginV} from "../controllers/users.controller.js"

const router = Router();

//all routes users's

//get all users
router.get('/users', getAllUsers)

//get a user
router.get('/users/:id', getUser)

//add new user
router.post('/users/add', AddUser)

//update user

router.put('/users/update/:id', UpdateUser)

//delete user
router.delete('/users/delete/:id', DeleteUser)

//ask user by rol
router.get('/users/rol/:id', userTypes)

//verify login
router.post('/users/login/verify', loginV)
export default router;