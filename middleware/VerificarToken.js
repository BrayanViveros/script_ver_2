import Jwt from "jsonwebtoken";
import {Usuarios} from "../models/Usuario.model.js";

export const verificarToken = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    console.log(token);
    if (!token) {
      return res.status(400).json("No existe el token");
    }
    token = token.split(" ")[1];
    const decoded = Jwt.verify(token, process.env.JWT_TOKEN);
    const user = await Usuarios.findOne({ _id: decoded.id });
    
    if (!user) {
      return res.status(404).json({ message: "No existe usuario" });
    }

    req._id = decoded.id;
    next();
  } catch (error) {
    res.status(400).json("No autorizado");
  }
};


export const demostrarContrasena = async (req, res) => {
  try {
    const { contrasena } = req.body; 
    const hashedPassword = await Usuarios.methods.encryptContrasena(contrasena);
    res.status(200).json({ hashedPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error al cifrar la contraseña' });
  }
};



// export const compararContrasena = async (req, res) => {
//   try {
//     const { contrasena } = req.body; // Obtén la contraseña del cuerpo de la solicitud
//     const usuario = await Usuarios.findById(req._id);
//     if (!usuario) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//     const isMatch = await Usuarios.methods.compareContrasena(contrasena, usuario.contraseña);
//     if (isMatch) {
//       res.status(200).json({ message: 'Contraseña coincidente' });
//     } else {
//       res.status(401).json({ message: 'Contraseña incorrecta' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error al comparar contraseñas' });
//   }
// };