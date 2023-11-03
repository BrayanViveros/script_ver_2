import jwt from "jsonwebtoken";
import Usuarios from '../models/Usuario.model.js';

export const getAllApdz = async (req, res) => {
  try {
    const Apdzs = await Usuarios.find();
    res.json(Apdzs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApdz = async (req, res) => {
  try {
    const Apdz = await Usuarios.findOne({ _id: req.params.id });
    res.json(Apdz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createApdz = async (req, res) => {
  try {
    console.log(req.body); // Verifica los datos antes de la inserción
    const nuevoUsuario = new Usuarios(req.body);
    await nuevoUsuario.save();

    // Generar un token para el nuevo usuario
    const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h", // El token expirará en 1 hora, puedes ajustar esto según tus necesidades
    });

    res.json({ message: '¡Registro creado correctamente!', token });
  }catch (error) {
    console.error(error); // Agrega un log para cualquier error durante la inserción
    res.status(500).json({ message: error.message });
  }
};
export const updateApdz = async (req, res) => {
  try {
    await Usuarios.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: '¡Registro actualizado correctamente!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApdz = async (req, res) => {
  try {
    await Usuarios.findByIdAndDelete(req.params.id);
    res.json({ message: '¡Registro eliminado correctamente!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
