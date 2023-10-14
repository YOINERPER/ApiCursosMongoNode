import mongoose from "mongoose";

const RolSchema = mongoose.Schema({
    Id_Rol : {
        type: Number,
        required : true
    },
    Nom_Rol:{
        type:String,
        required: true
    }
})

export default mongoose.model("Roles", RolSchema);