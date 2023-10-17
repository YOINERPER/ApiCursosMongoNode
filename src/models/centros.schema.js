import mongoose, { Schema } from "mongoose";

const centrosSchema = mongoose.Schema({
    Id_Centro: {
        type: String,
        required:true
    },
    Nom_Centro :{
        type: String,
        required:true
    },
    Tel_Centro : {
        type:String,
        required:true
    },
    List_Apr :{
        type:[Schema.ObjectId],
        ref: "aprendices"
    }
})

export default mongoose.model('Centros_Sena', centrosSchema)