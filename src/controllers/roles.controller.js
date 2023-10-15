import rolesSchema from "../models/roles.schema.js";


export const getAllRoles = async (req, res) => {
    try{
        const data = await rolesSchema.find();
        res.status(200).json({
            message: 'Success',
            results: data,
            data: 1
        })
    }catch(error){
        res.status(500).json({
            message: 'something went wrong',
            data: -2,
            
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
        const datos = req.body;

        const rol = await rolesSchema.findOne({"Id_Rol": id})
        
        const newRol = {
            Id_Rol: datos.Id_Rol || rol.Id_Rol,
            Nom_Rol : datos.Nom_Rol || rol.Nom_Rol
        }
        console.log(newRol)
        await rolesSchema.updateOne({ "Id_Rol": id }, { $set: newRol  })
            .then((data) => res.status(200).json({
                message: 'Rol updated successfully',
                data: 1,
               
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

export const RolDelete = async (req,res)=>{
    try{
        const {id} = req.params;
        await rolesSchema.deleteOne({"Id_Rol": id});
        res.status(200).json({
            message: "success",
            data: 1
        })

    }catch(error){
        res.status(500).json({
            message:"something went wrong",
            data:-6
        })
    }
}