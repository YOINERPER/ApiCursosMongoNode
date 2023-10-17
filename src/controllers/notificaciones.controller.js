import mongoose from "mongoose";
import notificacionesSchema from "../models/notificaciones.schema.js";
import usersSchema from "../models/users.schema.js";
import shortid from "shortid";

//get all notifications

export const getNotify = async (req, res) => {
    try {
        const data = await notificacionesSchema.find()
            .populate('Id_UserFK').exec();

        res.status(200).json({
            message: 'successfully',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong',
            data: -2
        })
    }
}

//add new notifications
export const addNot = async (req, res) => {
    try {
        const { Tip_Not, Cont_Not, fec_Cre_Not, Id_UserFK, visto } = req.body;
        const usuario = await usersSchema.findOne({ "Id_User": Id_UserFK });

        //generamos id unico parac ada notificacion

        const NewIdUser = shortid.generate();

        //verificamos que el id no exista
        const verificacion = await notificacionesSchema.findOne({ "Id_Not": NewIdUser })

        if (verificacion) {
            return res.status(500).json({
                message: "Id is registered"
            })
        }

        const notify = {
            Id_Not: NewIdUser,
            Tip_Not: Tip_Not,
            Cont_Not: Cont_Not,
            fec_Cre_Not: fec_Cre_Not,
            Id_UserFK: usuario._id,
            visto
        }
        const response = await notificacionesSchema(notify)
        await response.save()
            .then(async (data) => {
                res.status(200).json({
                    message: 'Added successfully',
                    data: 1
                });

                //enviamos la notificacion a el usuario
                const { _id } = data;
                usuario.Not_User.push(_id);
                usuario.save();
            })
            .catch((error) => res.status(500).json({
                message: 'something went wrong',
                data: -5
            }))
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong',
            data: -6
        })
    }




}


//update notifications
export const updtNot = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;


        // verificamos que exista el id
        const not = await notificacionesSchema.findOne({ "Id_Not": id })

        if (!not) {
            return res.status(500).json({
                message: "notification don't exist",
                data: -1
            })
        }

        const newNot = {
            Tip_Not: datos.Tip_Not || not.Tip_Not,
            Cont_Not: datos.Cont_Not || not.Cont_Not,
            visto: datos.visto || not.visto
        }

        await notificacionesSchema.updateOne({ "Id_Not": id }, { $set: newNot })
            .then(() => {
                res.status(200).json({
                    data: 1
                })
            }).catch((error) => {
                res.status(500).json({
                    data: -12
                })
            })
    } catch (error) {
        res.status(500).json({
            data: -6
        })
    }
}

//delete notification
export const delNot = async (req, res) => {
    const { id } = req.params;

    //verificamos que el id exista
    const existe = await notificacionesSchema.findOne({ "Id_Not": id })

    if (!existe) {

        return res.status(500).json({
            data: -1
        })
    }

    //eliminamos los id relacionados
    await usersSchema.updateMany({"Not_User": existe._id}, {$pull:{Not_User:existe._id}})
   .then((data)=>console.log(data)).catch((error)=>console.log(error))
    

    await notificacionesSchema.deleteOne({"Id_Not": id})
    .then(()=>res.status(200).json({
        data: 1
    })).catch((error)=>res.status(500).json({
        data:-13
    }))
}

