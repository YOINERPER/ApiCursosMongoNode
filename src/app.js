import express from "express"
import mongoose from "mongoose";
import { config } from "dotenv"
import router from "./routes/users.routes.js"
import rolesRoutes from "./routes/roles.routes.js"
import notiRoutes from "./routes/notificaciones.routes.js"
import cenRoutes from "./routes/centros.routes.js"
import aprRoutes from './routes/aprendices.routes.js'
import routesCat from "./routes/categorias.routes.js";
import curRoutes from "./routes/cursos.routes.js";



const app = express()
const port = process.env.PORT || 3000;

config()

// Middleware de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Especifica los métodos HTTP permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Especifica las cabeceras permitidas

    if (req.method === 'OPTIONS') {
        // Maneja las solicitudes de pre-vuelo
        return res.status(200).end();
    }

    next();
});

// Middleware para que entienda los datos recibidos
app.use(express.json());

// Rutas
app.use('/api', router);
app.use('/api', rolesRoutes);
app.use('/api', notiRoutes);
app.use('/api', cenRoutes);
app.use('/api', aprRoutes);
app.use('/api', routesCat);
app.use('/api', curRoutes);

// si la ruta no existe
app.use((req, res, next)=>{
    res.send("Page Not found")
})

// CONEXIÓN MONGODB
mongoose.connect("mongodb+srv://yoiner:12345@cluster0.7dedtuu.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Conexión a la base de datos exitosa"))
    .catch((error) => console.log(error));

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto: ${port}`);
});
