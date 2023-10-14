import { Router } from "express";
import { addNot, getNotify, getNotUsers} from "../controllers/notificaciones.controller.js";

const Noti_Routes = Router()

//get all notifications
Noti_Routes.get('/notifications', getNotify)

//add notifications
Noti_Routes.post('/notifications/add', addNot)

//get notifications by users
Noti_Routes.get('/notifications/user/:id', getNotUsers)



export default Noti_Routes