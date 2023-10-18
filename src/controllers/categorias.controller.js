import categoriasSchema from "../models/categorias.schema.js";



//get all categories
export const getCat = async (req, res) => {
    try {

        const data = await categoriasSchema.find().populate("Cur_List", "Id_Curso Nom_Curso").exec();
        res.status(200).json({
            data: data
        })


    } catch (error) {
        res.status(500).json({
            data: -2,
            error: error.message
        })
    }
}


//add categories
export const addCat = async (req, res) => {
    try {
        const datos = req.body;
        //verificamos que el id no exista
        const verificacion = await categoriasSchema.findOne({ "Id_Cat": datos.Id_Cat })

        if (verificacion) {
            return res.status(500).json({
                data: -4,
                results: "Id Category is registered"
            })
        }

        const response = await categoriasSchema(datos)
        response.save()
            .then(() => res.status(200).json({
                data: 1,
            })).catch((error) => res.status(500).json({
                error: error,
                data: -5
            }))
    } catch (error) {
        res.status(500).json({
            error: error.message,
            data: -6
        })
    }
}

//delete categories
export const delCat = async (req, res) => {
    try {
        const { id } = req.params;

        // verificamos que el id exista
        const verificacion = await categoriasSchema.findOne({ "Id_Cat": id })

        if (!verificacion) {
            return res.status(500).json({
                data: -3,
                results: "Category not found"
            })
        }

        await categoriasSchema.deleteOne({ "Id_Cat": id })
            .then(() => res.status(200).json({
                data: 1,
            })).catch((error) => res.status(500).json({
                error: error,
                data: -13
            }))

    } catch (error) {
        res.status(500).json({
            error: error.message,
            data: -6
        })
    }

}

//update categories
export const updCat = async (req, res) => {

    try {
        const { id } = req.params;
        const datos = req.body;

        // verificamos que exista el id
        const verificacion = await categoriasSchema.findOne({ "Id_Cat": id })

        if (!verificacion) {
            return res.status(500).json({
                data: -3,
                results: "Category not found"
            })
        }

        const newCat = {
            Id_Cat: datos.Id_Cat || verificacion.Id_Cat,
            Nom_Cat: datos.Nom_Cat || verificacion.Nom_Cat
        }

        await categoriasSchema.updateOne({ "Id_Cat": id }, { $set: newCat })
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