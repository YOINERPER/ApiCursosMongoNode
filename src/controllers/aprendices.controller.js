import aprendicesSchema from "../models/aprendices.schema.js";
import centrosSchema from "../models/centros.schema.js";
import userSchema from "../models/users.schema.js"
import shortid from "shortid";


//get all learners

export const getApr =async(req, res)=>{
    try{

        const data = await aprendicesSchema.find().populate("user_Apr", "Id_User Nom_User").exec();
        res.status(200).json({
            data: data
        })

    }catch(error){
        res.status(500).json({
            data:-2
        })
    }
}


//add aprendiz

export const addAprendiz = async (req, res) => {
    try {
        const { Fic_Apr, Cen_Apr_FK, user_Apr } = req.body;



        //autogeneramos id aprendiz 
        const newId = shortid.generate();


        // Obtenemos el objectId del centro
        const centro = await centrosSchema.findOne({ "Id_Centro": Cen_Apr_FK })
            .catch((error) => res.status(500).json({
                data: -15,
                error: error
            }))

        //obtenemos el objectId del usuario
        const user = await userSchema.findOne({ "Id_User": user_Apr })
            .catch((error) => res.status(500).json({
                data: -10,
                error: error
            }))


        //verificamos que el aprendiz no exista
        const existe = await aprendicesSchema.findOne({ "user_Apr": user._id })
        if (existe) {
            return res.status(500).json({
                message: "Is registered",
                data: -4
            })
        }

        const aprendiz = {
            Id_Apr: newId,
            Fic_Apr,
            Cen_Apr_FK: centro._id,
            user_Apr: user._id
        }

        await aprendicesSchema(aprendiz).save()
            .then(async (datos) => {
                res.status(200).json({
                    data: 1,
                })

                //enviamos el id del aprendiz a la lista de aprendices del centro
                const aprCentro = await centrosSchema.findOne({ "_id": centro._id })
                aprCentro.List_Apr.push(datos._id)
                aprCentro.save()

                //enviamos el id del aprendiz al usuario correspondiente
                await userSchema.updateOne({ "_id": user._id }, { $set: { Id_Apr: datos._id } })


            }
            ).catch((error) => res.status(500).json({
                data: -5,
                error: error.message
            }))
    } catch (error) {
        res.status(500).json({
            data: -5,
            error: error.message
        })
    }
}

//update aprendiz
export const updtApr = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        //verificamos que exista el id
        const apre = await verificarId(id)
        if (!apre) {
            return res.status(500).json({
                data: -1
            })
        }
        

        // obtenemos el object id del centro si se va a actualizar
        let idCentro = apre.Cen_Apr_FK;
        if (datos.Cen_Apr_FK) {
            try {
                const { _id } = await centrosSchema.findOne({ "Id_Centro": datos.Cen_Apr_FK })
                idCentro = _id
                
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    data: -15
                })
            }

        }
        

        //obtenemos el object id del usuario que es aprendiz
        let userId = apre.user_Apr;
        if (datos.user_Apr) {
            try {
                const { _id } = await userSchema.findOne({ "Id_Centro": datos.Cen_Apr_FK })
                userId = _id
            } catch (error) {
                res.status(500).json({
                    error: error.mesage,
                    data: -1
                })
            }

        }

        const newApr = {
            Id_Apr: datos.Id_Apr || apre.Id_Apr,
            Fic_Apr: datos.Fic_Apr || apre.Fic_Apr,
            Cen_Apr_FK: idCentro,
            user_Apr: userId
        }

        //actualizamos 
        await aprendicesSchema.updateOne({ "_id": apre._id }, { $set: newApr })
            .then(async () => {
                res.status(200).json({
                    data: 1,
                })

            }).catch(error => res.status(500).json({
                data: -12,
                error: error.message
            }))
    } catch (error) {
        res.status(500).json({
            data: -6,
            error: error.message
        })
    }

}

//delete learners

export const delApr = async (req, res)=>{
    const {id} = req.params

    // verificamos que exista el id
    const aprendiz = await aprendicesSchema.findOne({"Id_Apr": id})

    if(!aprendiz){
        return res.status(500).json({
            data: -3
        })
    }

    await aprendicesSchema.deleteOne({"_id": aprendiz._id})
    .then(async ()=>{
        res.status(200).json({
            data:1
        })
        console.log(aprendiz.user_Apr)
        //eliminamos los id relacionados con usuarios
        await userSchema.updateMany({"_id": aprendiz.user_Apr}, {$set:{"Id_Apr":null}})
        .then((data)=>console.log(data)).catch((error)=>console.log(error))

        //eliminamos los id relacionados con centros
        await centrosSchema.updateMany({"List_Apr": aprendiz._id},{$pull:{"List_Apr": aprendiz._id}})
        .then((data)=>console.log(data)).catch((error)=>console.log(error))

    }).catch((error)=>{
        res.status(500).json({
            error: error.message,
            data:-13
        })
    })

}


const verificarId = async (id) => {

    return await aprendicesSchema.findOne({ "Id_Apr": id })
        .catch((error) => res.status(500).json({
            data: -6,
            error: error.message
        }))
}