import mongoose, { Mongoose, Schema } from "mongoose";

const cursoSchema = mongoose.Schema({
    Id_Curso:{
        type:Number,
        required: true
    },
    Nom_Curso:{
        type: String,
        required: true
    },
    Des_Curso:{
        type: String,
        required: true
    },
    Id_Cat_FK:{
        type:Schema.ObjectId,
        required: true,
        ref: "categorias"
    }
})

export default mongoose.model('Cursos', cursoSchema)