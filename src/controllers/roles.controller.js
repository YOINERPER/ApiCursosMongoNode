import rolesSchema from "../models/roles.schema.js";


export const getAllRoles = async (req, res) => {
    await rolesSchema.find()
        .then((data) => res.status(200).json({
            message: 'Success',
            data: data,
            results: 1
        }))
        .catch((error) => res.status(500).json({
            message: 'something went wrong',
            results: -1
        }))
}

//add new rol
export const AddRol = async (req, res) => {
    const rol = await rolesSchema(req.body);
    rol.save()
        .then(() => res.status(200).json({
            message: "rol added successfully",
            results: 1
        }))
        .catch(() => res.status(500).json({
            message: "Something went wrong",
            results: -1
        }))
}


//update roles
export const rolUpdate = async (req, res) => {
    const { id } = req.params;
    const { Id_Rol, Nom_Rol } = req.body;
    await rolesSchema.updateOne({ "Id_Rol": id }, { $set: { Id_Rol, Nom_Rol } })
        .then((data) => res.status(200).json({
            message: 'Rol updated successfully',
            data: data,
            results:1
        }))
        .catch((error) => res.status(500).json({
            Errormessage: 'something went wrong',
            results:-1
        }))
}
