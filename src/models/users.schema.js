import mongoose, { Schema } from "mongoose";

//1 se crea el esquema o modelo de datos en este caso del usuario
const userSchema = mongoose.Schema({
    Id_User: {
        type: Number,
        required: true,
    },
    Nom_User: {
        type: String,
        required: true,
    },
    Ape_User: {
        type: String,
        required: true,
    },
    Tel_User: {
        type: String,
        required: true,
    },
    Ema_User: {
        type: String,
        required: true,
    },
    
    Pass_User: {
        type: String,
        required: true,
    },
    Fot_Per_User: {
        type: String,
        default: null
    },
    Rol_User_Fk: {
        type: Schema.ObjectId,
        ref: 'Roles',
        default: null
    },
    Cod_Ver_User:{
        type:String,
        default: null
    },
    Not_User: {
        type: [Schema.ObjectId],
        ref: 'Notificaciones_Usuarios'
    },
    Id_Apr:{
        type:Schema.ObjectId,
        ref: "aprendices",
        default: null
    },
    list_Cursos:{
        type: [Schema.ObjectId],
        ref: "Cursos"
    }
})

export default mongoose.model('Usuarios', userSchema);