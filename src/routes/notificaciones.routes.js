import { Router } from "express";
import { addNot, getNotify, updtNot, delNot} from "../controllers/notificaciones.controller.js";

const Noti_Routes = Router()

//get all notifications
Noti_Routes.get('/notifications', getNotify)

//add notifications
Noti_Routes.post('/notifications/add', addNot)

//Update notification
Noti_Routes.put('/notifications/update/:id',updtNot )

//delete notifications
Noti_Routes.delete('/notifications/delete/:id', delNot)
export default Noti_Routes