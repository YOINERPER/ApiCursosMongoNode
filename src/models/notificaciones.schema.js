import mongoose, {Schema} from "mongoose";

const notiSchema = mongoose.Schema({
    Id_Not : {
        type:String,
        default: null
    },
    Tip_Not : {
        type:String,
        required:true
    },
    Cont_Not : {
        type:String,
        required:true
    },
    fec_Cre_Not :{
        type:Date,
        default: Date.now
    },
    Id_UserFK :{
        type: Schema.ObjectId,
        required: true,
        ref: 'Usuarios'
    },
    visto:{
        type:Boolean,
        default: false
    }
})

export default mongoose.model('Notificaciones_Usuarios', notiSchema)