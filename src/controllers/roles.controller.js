import rolesSchema from "../models/roles.schema.js";


export const getAllRoles = async (req, res) => {
    try{
        await rolesSchema.find().populate('users').exec()
        .then((data) => res.status(200).json({
            message: 'Success',
            data: data,
            data: 1
        }))
        .catch((error) => res.status(500).json({
            message: 'something went wrong',
            data: -1
        }))
    }catch(error){
        res.status(500).json({
            message: 'something went wrong',
            data: -2
        })
    }
}

//add new rol
export const AddRol = async (req, res) => {
    try {
        const rol = await rolesSchema(req.body);
        rol.save()
            .then(() => res.status(200).json({
                message: "rol added successfully",
                data: 1
            }))
            .catch(() => res.status(500).json({
                message: "Something went wrong",
                data: -1
            }))
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            data: -2
        })
    }

}


//update roles
export const rolUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { Id_Rol, Nom_Rol } = req.body;
        await rolesSchema.updateOne({ "Id_Rol": id }, { $set: { Id_Rol, Nom_Rol } })
            .then((data) => res.status(200).json({
                message: 'Rol updated successfully',
                data: data,
                data: 1
            }))
            .catch((error) => res.status(500).json({
                Errormessage: 'something went wrong',
                data: -1
            }))
    } catch (error) {
        res.status(500).json({
            Errormessage: 'something went wrong',
            data: -2
        })
    }
}

export const rolUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await rolesSchema.findOne({ "Id_Rol": id }).populate('users').exec();
        res.status(200).json({
            message: "success",
            data: data.users
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            data: -1
        })
    }



}