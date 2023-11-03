import User from "../models/Usuario.model.js";

export const verificar = async (req, res, next) => {
  const { Correo, contrasena } = req.body;
  if (!Correo || !contrasena) {
    return res.status(400).json("Ingrese todos los campos!");
  }

  // Buscar usuario por el campo Correo (con mayúscula)
  const userCorreo = await User.findOne({ Correo: Correo });
  if (userCorreo) {
    return res.status(400).json("Correo ya existente!");
  }

  next();
};
