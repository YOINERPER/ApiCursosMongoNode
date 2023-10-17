import centrosSchema from "../models/centros.schema.js"
import aprendicesSchema from "../models/aprendices.schema.js";

// add new center
export const addCentro = async (req, res) => {

    try {

        const centro = await centrosSchema(req.body)
        centro.save()
            .then(() => res.status(200).json({
                data: 1
            }))
            .catch((error) => res.status(500).json({
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

//get all centers
export const getCentros = async (req, res) => {

    try {
        const data = await centrosSchema.find().populate().exec();

        res.status(200).json({
            data: data
        })

    } catch (error) {
        res.status(500).json({
            data: -5,
            error: error.message
        })
    }

}

//update center
export const updCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        //verificar que exista el centro
        const existe = await centrosSchema.findOne({ "Id_Centro": id })

        if (!existe) {
            return res.status(500).json({
                data: -1,
                error: error.message
            })
        }

        const centro = {
            Id_Centr: datos.Id_Centro || existe.Id_Centro,
            Nom_Centro: datos.Nom_Centro || existe.Nom_Centro,
            Tel_Centro: datos.Tel_Centro || existe.Tel_Centro
        }

        //actaulizamos
        await centrosSchema.updateOne({ "Id_Centro": id }, { $set: centro })
            .then((results) => res.status(200).json({
                data: 1,
                results: results
            }))
            .catch((error) => res.status(500).json({
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

//delete center
export const delCenter = async (req, res) => {
    try {
        const { id } = req.params;

        //verificamos que exista
        const existe = await centrosSchema.findOne({ "Id_Centro": id })

        if (!existe) {
            return res.status(500).json({
                data: -1,
                error: error.message
            })
        }

        //eliminamos los relacionados
        await aprendicesSchema.updateMany({"Cen_Apr_FK": existe._id}, {$set: {Cen_Apr_FK:null}})
        .then((data)=>console.log(data)).catch((error)=>console.log(error))

        //eliminamos
        await centrosSchema.deleteOne({ "Id_Centro": id })
            .then(() => res.status(200).json({
                data: 1
            }))
            .catch((error) => res.status(500).json({
                data: -13,
                error: error.message
            }))
    } catch (error) {
        res.status(500).json({
            data: -6,
            error: error.message
        })
    }
}