import categoriasSchema from "../models/categorias.schema.js";
import cursosSchema from "../models/cursos.schema.js";



//get all courses
export const getCursos = async (req, res)=>{
    try{

        const data = await cursosSchema.find().populate('Id_Cat_FK', "Nom_Cat").exec();
        res.status(200).json({
            data: data
        })

    }catch(error){
        res.status(500).json({
            data: -2,
            error: error.message
        })
    }
}

//add new course
export const addCurso = async (req, res)=>{
    try{

        const datos = req.body;
        console.log(datos)

        // verificamos que no este registrado el curso
        const curso = await cursosSchema.findOne({"Id_Curso": datos.Id_Curso})

        if(curso){
            return res.status(500).json({
                data: -4,
                results: "Id course is registered"
            })
        }

        //convertimos el id categoria a objectid

        const categoria = await categoriasSchema.findOne({"Id_Cat": datos.Id_Cat_FK})
        
        if (!categoria) {
            return res.status(500).json({
                data: -3,
                results: "Category not found"
            })
        }

        const newCurso = {
            Id_Curso : datos.Id_Curso,
            Nom_Curso: datos.Nom_Curso,
            Des_Curso: datos.Des_Curso,
            Id_Cat_FK:categoria._id
        }
        

        const response = await cursosSchema(newCurso)
        response.save()
            .then(() => {
                res.status(200).json({
                    data: 1,
                })

                // enviamos el objectId del curso a la categoria
                categoria.Cur_List.push(response._id)
                categoria.save()

            }).catch((error) => res.status(500).json({
                error: error,
                data: -5
            }))

        

    }catch(error){
        res.status(500).json({
            error: error.message,
            data: -6
        })
    }
}