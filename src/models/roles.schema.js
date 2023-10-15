import mongoose, { Schema } from "mongoose";

const RolSchema = mongoose.Schema({
    Id_Rol : {
        type: Number,
        required : true
    },
    Nom_Rol:{
        type:String,
        required: true
    },
    users:{
        type:[Schema.ObjectId],
        ref: "Usuarios"
    }
})

export default mongoose.model("Roles", RolSchema);