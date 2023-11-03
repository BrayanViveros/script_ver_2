import jwt from "jsonwebtoken";
import Clase from "../models/Clase.model.js";


export const getAllClases = async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClase = async (req, res) => {
  try {
    const clase = await Clase.findOne({ _id: req.params.id });
    res.json(clase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClase = async (req, res) => {
  try {
    console.log(req.body); 
    const nuevaClase = new Clase(req.body);
    await nuevaClase.save();

    const token = jwt.sign({ id: nuevaClase._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h", 
    });

    res.json({ message: "¡Registro creado correctamente!", token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
};

export const updateClase = async (req, res) => {
  try {
    await Clase.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "¡Registro actualizado correctamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClase = async (req, res) => {
  try {
    await Clase.findByIdAndDelete(req.params.id);
    res.json({ message: "¡Registro eliminado correctamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};