import express from "express";
import cors from "cors";
import morgan from "morgan";
import  miruta  from "./routes/routes.User.js";
import routerRol from "./routes/routes.Rol.js";

const app = express();

// import notesRoutes from "./routes/notes.routes.js";
// import usersRoutes from "./routes/users.routes.js";
// import authRoutes from "./routes/auth.routes.js";

// app.get('/', (req, res) => {
//   res.send('¡Hola Mundo!');
// });

// app.post('/', (req, res) => {
//   res.send('registraste un usuario!');
// });

app.get('/apdzs', miruta, routerRol)

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use('/usuarios',miruta, routerRol);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  });
  
  export default app;

















// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const config = require('./config');

// import router from './routes/routes';

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// router();
// // Conexión a la base de datos
// mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });

// // Rutas y lógica de la aplicación (puedes crear archivos en la carpeta 'routes' para esto)
// app.get('/', (req, res) => {
//   res.send('¡Hola Mundo!');
// });

// // Escucha del servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en el puerto ${PORT}`);
// });
