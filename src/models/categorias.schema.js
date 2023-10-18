import mongoose, { Schema } from "mongoose";

const CatSchema = mongoose.Schema({
    Id_Cat : {
        type:Number,
        required: true
    },
    Nom_Cat: {
        type:String,
        required: true
    },
    Cur_List :{
        type: [Schema.ObjectId],
        ref: "Cursos"
    }
})

export default mongoose.model("categorias", CatSchema)