import mongoose, { Schema } from "mongoose";

const AprSchema = mongoose.Schema({
    Id_Apr : {
        type : String,
        required : true
    },
    Fic_Apr : {
        type : String,
        required : true
    },
    Cen_Apr_FK : {
        type: Schema.ObjectId,
        ref: "Centros_Sena",
        required: true
    },
    user_Apr : {
        type: Schema.ObjectId,
        ref : "Usuarios"
    }
})

export default mongoose.model('aprendices', AprSchema)