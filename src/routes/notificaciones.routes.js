import { Router } from "express";
import { addNot, getNotify} from "../controllers/notificaciones.controller.js";

const Noti_Routes = Router()

//get all notifications
Noti_Routes.get('/notifications', getNotify)

//add notifications
Noti_Routes.post('/notifications/add', addNot)

export default Noti_Routes