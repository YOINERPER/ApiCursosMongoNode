import mongoose from "mongoose";
import notificacionesSchema from "../models/notificaciones.schema.js";
import usersSchema from "../models/users.schema.js";
import rolesSchema from "../models/roles.schema.js";

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
            message: 'something went wrong'
        })
    }
}

//add new notifications
export const addNot = async (req, res) => {
    try {
        const { Id_Not, Tip_Not, Cont_Not, fec_Cre_Not, Id_UserFK, visto } = req.body;
        const usuario = await usersSchema.findOne({ "Id_User": Id_UserFK });
        const { _id } = usuario;

        //verificamos que el id no exista
        const verificacion = await notificacionesSchema.findOne({ "Id_Not": Id_Not })

        if (verificacion) {
            return res.status(500).json({
                message: "Id is registered"
            })
        }

        const notify = {
            Id_Not: Id_Not,
            Tip_Not: Tip_Not,
            Cont_Not: Cont_Not,
            fec_Cre_Not: fec_Cre_Not,
            Id_UserFK: _id,
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
                data: -1
            }))
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong',
            data: -2
        })
    }




}


