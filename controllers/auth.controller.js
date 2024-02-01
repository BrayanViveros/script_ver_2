import User from "../models/Usuario.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

// export const getAllTask = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const register = async (req, res) => {
  try {
    const {
      NomCompleto,
      email,
      password,
      Telefono,
      N_Identificacion,
      Fec_Nacimiento,
      Ciudad,

    } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: "The email is already in use",
      });

    // hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //Creo el nuevo usuario
    const newUser = new User({
      NomCompleto,
      email,
      password: passwordHash,
      Telefono,
      N_Identificacion,
      Fec_Nacimiento,
      Ciudad,
    });

    // guardar al usuario en la base de datos
    const userSaved = await newUser.save();

    // crear acceso al token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      NomCompleto: userSaved.NomCompleto,
      email: userSaved.email,
      Telefono: userSaved.Telefono,
      N_Identificacion: userSaved.N_Identificacion,
      Fec_Nacimiento: userSaved.Fec_Nacimiento,
      Ciudad: userSaved.Ciudad,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Este es mi inicio de sección
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      NomCompleto: userFound.NomCompleto,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      NomCompleto: userFound.NomCompleto,
      email: userFound.email,
      Telefono: userFound.Telefono,
      N_Identificacion: userFound.N_Identificacion,
      Fec_Nacimiento: userFound.Fec_Nacimiento,
      Ciudad: userFound.Ciudad,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Aqui hago la verificacion del token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      NomCompleto: userFound.NomCompleto,
      email: userFound.email,
      Telefono: userFound.Telefono,
      N_Identificacion: userFound.N_Identificacion,
      Fec_Nacimiento: userFound.Fec_Nacimiento,
      Ciudad: userFound.Ciudad,
    });
  });
};
// Aqui hago la funcion para cerrar la seccion

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
