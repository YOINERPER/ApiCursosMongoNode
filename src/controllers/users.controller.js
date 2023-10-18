import userSchema from "../models/users.schema.js"
import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import rolesSchema from "../models/roles.schema.js"
import { mensajeEnviar } from "../mails/Emailmessages/verification.message.js"

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const user = await userSchema.find()
            .populate('Rol_User_Fk', 'Nom_Rol')
            .populate('Id_Apr')
            .exec();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: 'somethin went wrong',
            data: -2,
            result: error.message
        })
    }

}

//get a user
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userSchema.findOne({ "Id_User": id })
            .populate('Rol_User_Fk')
            .populate('Not_User') // muestra la info relacionada
            .exec();
        if (!user) {
            return res.status(400).json({
                message: 'user not found',
                data: 10
            })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: 'somethin went wrong',
            data: -6
        })
    }
}




//add new users ========================================= 
export const AddUser = async (req, res) => {
    try {
        const {
            Id_User,
            Nom_User,
            Ape_User,
            Tel_User,
            Ema_User,
            Dir_User,
            Pass_User,
            Fot_Per_User,
            Rol_User_Fk,
            Not_User
        } = req.body;

        //confirmamos que exista el user
        const userFind = await userSchema.find({ "Id_User": Id_User })
        if (userFind.length) {
            return res.status(505).json({
                message: 'error user id is registered',
                data: -4
            })
        }
        //confirmamos que el email no este registrado
        const EmailFind = await userSchema.find({ "Ema_User": Ema_User })
        if (EmailFind.length) {
            return res.status(505).json({
                message: 'error Email is registered',
                data: -11
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
        if (Rol_User_Fk === 1) {
            rol = "6528b9ba022cedd0cb70b310"
            rolObjectId = new mongoose.Types.ObjectId(rol);
        } else if (Rol_User_Fk === 2) {

            rol = "6528b9cd022cedd0cb70b312"
            rolObjectId = new mongoose.Types.ObjectId(rol);

        } else if (Rol_User_Fk === 3) {
            rol = "6528b9d6022cedd0cb70b314"
            rolObjectId = new mongoose.Types.ObjectId(rol);

        } else {
            return res.status(500).json({
                message: "Rol dont exist",
                data: -3
            })
        }

        //generar codigo de verificacion
        const CodLeng = 5;
        const word = "abcdefghijkmnopkrstu1234567890!$#%&/()";
        const CodLenghas = async (CodLeng, word) => {
            const salt = await bcrypt.genSalt(pwdLength)
            const hash = await bcrypt.hash(Pass_User, salt)
            return hash
        }

        const tokenVer = await CodLenghas(pwdLength, Pass_User);

        //envio del codigo de verificacion
        mensajeEnviar(Ema_User, Nom_User, tokenVer, Pass_User);


        const user = new userSchema({
            Id_User,
            Nom_User,
            Ape_User,
            Tel_User,
            Ema_User,
            Dir_User,
            Pass_User: newPass,
            Fot_Per_User,
            Rol_User_Fk: rol,
            Cod_Ver_User: tokenVer,
            Not_User
        });



        try {
            const result = await user.save();
            res.status(201).json({
                message: 'Usuario agregado exitosamente',
                data: result,
                data: 1
            });

            //agregamos el id de usuario al rol correspondiente
            const { _id, Rol_User_Fk } = result;
            const rol = await rolesSchema.findOne({ _id: Rol_User_Fk });
            rol.users.push(_id);
            rol.save();

        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                data: -2
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            data: -6
        });
    }
};

//update users
export const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userSchema.findOne({ "Id_User": id });
        const datos = req.body;

        //verifiquemos que no exista
        
        if(datos.Ema_User){
            const emailV = await userSchema.find({"Ema_User":datos.Ema_User}) 
            if(emailV.length){
                return res.status(500).json({
                    message: "Email is registered",
                    data: -11
                })
            }
        }
        


        // verificacion de contraseña
        const verifyPass = async (pass) => {

            const result = await bcrypt.compare(pass, user.Pass_User)
            if (result) {
                return Pass_User
            } else {
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(user.Pass_User, salt)

                return hash
            }
        };

        const newPass = await verifyPass(datos.Pass_User || user.Pass_User);

        const UserUpdated = {
             Nom_User: datos.Nom_User || user.Nom_User,
             Ape_User: datos.Ape_User || user.Ape_User,
             Tel_User: datos.Tel_User || user.Tel_User,
             Ema_User: datos.Ema_User || user.Ema_User,
             Dir_User : datos.Dir_User || user.Dir_User,
             Pass_User: newPass,
             Fot_Per_User: datos.Fot_Per_User || user.Fot_Per_User,
             Rol_User_Fk : datos.Rol_User_Fk || user.Rol_User_Fk,
             Cod_Ver_User: user.Cod_Ver_User,
             Not_User:user.Not_User 
            }

        
        await userSchema.updateOne({ "Id_User": id }, { $set: UserUpdated })
            .then((data) => res.status(200).json({
                message: "User updated successfully",
                data: 1
            }))
            .catch((error) => res.status(500).json({
                message: "Something went wrong",
                data: -12
            }));
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            data: -6
        })
    }
}

//delete users
export const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userSchema
            .deleteOne({ "Id_User": id })
            .then((data) => res.status(200).json({
                message: "User deleted successfully",
                data: 1
            }))
            .catch((error) => res.status(500).json({
                message: "Something went wrong",
                data: -13
            }));
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            data: -6
        })
    }

}

//verify login
export const loginV = async (req, res) => {
    try {
        const { Ema_User, Pass_User } = req.body;

        //verificamos que el email exista
        const Email = await userSchema.findOne({ Ema_User: Ema_User })
        //O verificamos que el usuario exista
        const User = await userSchema.findOne({ Nom_User: Ema_User })

        if (Email != null) {

            //verificamos la contraseña
            verificaPass(Pass_User, Email, res)

        } else if (User != null) {
            //verificamos la contraseña
            verificaPass(Pass_User, User, res)
        } else {
            res.status(505).json({
                message: "Email or user not exist",
                data: -10
            })
        }
    } catch (error) {
        res.status(505).json({
            message: "Somethin went wrong",
            data: -6
        })
    }
}

const verificaPass = async (Pass_User, userEmail, res) => {
    try {
        let verificacion = await bcrypt.compare(Pass_User, userEmail.Pass_User);
        if (!verificacion) {
            return res.status(505).json({
                message: "incorrect password",
                data: -7
            })
        } else {
            return res.status(200).json({
                message: "succesfully",
                data: 1
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            data: -6
        })
    }
}

export const getUserNot = async (req, res) => {
    try {
        const { id } = req.params;
        const { Not_User } = await userSchema.findOne({ "Id_User": id }).populate("Not_User").exec();
        res.status(200).json({
            message: "success",
            data: Not_User
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            data: -6
        })
    }
}
