import userSchema from "../models/users.schema.js"
import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import rolesSchema from "../models/roles.schema.js"

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const user = await userSchema.find()
            .populate('Rol_User_Fk')
            .exec();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: 'somethin went wrong',
            results:-1
        })
    }

}

//get a user
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userSchema.findOne({"Id_User":id})
            .populate('Rol_User_Fk') // muestra la info relacionada
            .exec();
        if (!user) {
            return res.status(400).json({
                message: 'user not found',
                results:-1
            })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: 'somethin went wrong',
            results:-2
        })
    }
}



//add new users 
export const AddUser = async (req, res) => {
    const {
        Id_User,
        Nom_User,
        Ape_User,
        Tel_User,
        Ema_User,
        Dir_User,
        Pass_User,
        Fot_Per_User,
        Rol_User_Fk
    } = req.body;

    //confirmamos que exista el user
    const userFind = await userSchema.find({ "Id_User": Id_User })
    if (userFind.length) {
        return res.status(505).json({
            message: 'error user id is registered',
            results:-2
        })
    }

    //encriptamos la contraseña

    const pwdLength = 10;
    const pwdHash = async (pwdLength, Pass_User) => {
        const salt = await bcrypt.genSalt(pwdLength)
        const hash = await bcrypt.hash(Pass_User, salt)
        return hash
    }

    const newPass = await pwdHash(pwdLength, Pass_User);


    // Convierte el campo Rol_User_Fk en un ObjectId
    let rol;
    let rolObjectId;
    if(Rol_User_Fk ==="1"){
        rol = "6528b9ba022cedd0cb70b310"
        rolObjectId= new mongoose.Types.ObjectId(rol);
    }else if(Rol_User_Fk === "2"){

        rol = "6528b9cd022cedd0cb70b312"
        rolObjectId= new mongoose.Types.ObjectId(rol);

    }else if(Rol_User_Fk === "3"){
        rol = "6528b9d6022cedd0cb70b314"
        rolObjectId= new mongoose.Types.ObjectId(rol);

    }else{
        return res.status(500).json({
            message:"Rol dont exist",
            results: -1
        })
    }



    const user = new userSchema({
        Id_User,
        Nom_User,
        Ape_User,
        Tel_User,
        Ema_User,
        Dir_User,
        Pass_User: newPass,
        Fot_Per_User,
        Rol_User_Fk: rol
    });

    try {
        const result = await user.save();
        res.status(201).json({
            message: 'Usuario agregado exitosamente',
            data: result,
            results:1
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            results:-3
        });
    }
};

//update users
export const UpdateUser = async (req, res) => {
    const { id } = req.params;
    const { Id_User, Nom_User, Ape_User, Tel_User, Ema_User, Dir_User, Pass_User, Fot_Per_User, Rol_User_Fk } = req.body;

    const user = await userSchema.findOne({ "Id_User": id });

    const verifyPass = async (pass) => {

        const result = await bcrypt.compare(pass, user.Pass_User)
        if (result) {
            return Pass_User
        } else {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(Pass_User, salt)

            return hash
        }
    };

    const newPass = await verifyPass(Pass_User);
   
    await userSchema.updateOne({ _id: id }, { $set: { Id_User, Nom_User, Ape_User, Tel_User, Ema_User, Dir_User, Pass_User: newPass, Fot_Per_User, Rol_User_Fk } })
        .then((data) => res.status(200).json({
            message: "User updated successfully",
            results:1
        }))
        .catch((error) => res.status(500).json({
            message: "Something went wrong",
            results:-1
        }));
}

//delete users
export const DeleteUser = async (req, res) => {
    const { id } = req.params;
    await userSchema
        .deleteOne({ "Id_User": id })
        .then((data) => res.status(200).json({
            message: "User deleted successfully",
            results:1
        }))
        .catch((error) => res.status(500).json({
            message: "Something went wrong",
            results:-1
        }));
    
}

//user by rol
export const userTypes = async (req, res) => {

    const { id } = req.params;//id rol
    
    try {
        const {_id} = await rolesSchema.findOne({"Id_Rol":id});
        const users = await userSchema.find({ "Rol_User_Fk": _id }).populate('Rol_User_Fk').exec();
        res.status(200).json({
            message: 'success',
            results: users
        })
    } catch (error) {
        res.status(500).json({
            message: 'somethin went wrong',
            Error: "Rol don't exist",
            results: -1
        
        })
    }


}

//verify login
export const loginV = async (req, res) => {
    const { Ema_User, Pass_User } = req.body;
  
    //verificamos que el email exista
    const Email = await userSchema.findOne({ Ema_User: Ema_User })
    //O verificamos que el usuario exista
    const User = await userSchema.findOne({ Nom_User: Ema_User })
    
    if (Email != null) {

        //verificamos la contraseña
        verificaPass(Pass_User, Email, res)

    }else if(User != null){
         //verificamos la contraseña
         verificaPass(Pass_User, User, res)
    }else{
        res.status(505).json({
            message:"Email or user not exist",
            result: -2
        })
    }
}

const verificaPass= async (Pass_User,userEmail, res)=>{
    let verificacion = await bcrypt.compare(Pass_User, userEmail.Pass_User);
        if (!verificacion) {
            return res.status(505).json({
                message:"incorrect password",
                results: -1
            })
        }else{
            return res.status(200).json({
                message:"succesfully",
                results: 1
            })
        }
}