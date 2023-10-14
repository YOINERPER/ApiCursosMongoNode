import mongoose from "mongoose";
import notificacionesSchema from "../models/notificaciones.schema.js";
import usersSchema from "../models/users.schema.js";

//get all notifications

export const getNotify = async (req, res) => {
    try {
        const data = await notificacionesSchema.find()
            .populate('Id_UserFK').exec();

        res.status(200).json({
            message: 'successfully',
            results: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}

//add new notifications
export const addNot = async (req, res) => {
    const { Id_Not, Tip_Not, Cont_Not, fec_Cre_Not, Id_UserFK } = req.body;
    const { _id } = await usersSchema.findOne({ "Id_User": Id_UserFK });
    
    const notify = {
        Id_Not: Id_Not,
        Tip_Not: Tip_Not,
        Cont_Not: Cont_Not,
        fec_Cre_Not: fec_Cre_Not,
        Id_UserFK: _id
    }
    const response = await notificacionesSchema(notify)
    response.save()
        .then((data) => res.status(200).json({
            message: 'Added successfully',
            data:data
        }))
        .catch((error) => res.status(500).json({
            message: 'something went wrong',
            data:-1
        }))
}

// get notifications by user
export const getNotUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = await usersSchema.findOne({ "Id_User": id });
        const users = await notificacionesSchema.find({ "Id_UserFK": _id }).populate('Id_UserFK').exec();

        res.status(200).json({
            message: 'successfully',
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            message: 'not found user',
            data: -1
        })
    }





}
