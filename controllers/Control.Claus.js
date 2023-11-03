import jwt from "jsonwebtoken";
import Claus from "../models/ClasUsuario.model.js";


export const getAllClaus = async (req, res) => {
  try {
    const ClausList = await Claus.find();
    res.json(ClausList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClaus = async (req, res) => {
  try {
    const ClausItem = await Claus.findOne({ _id: req.params.id });
    res.json(ClausItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClaus = async (req, res) => {
  try {
    console.log(req.body);
    const newClaus = new Claus(req.body);
    await newClaus.save();

    
    const token = jwt.sign({ id: newClaus._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h", 
    });

    res.json({ message: "¡Registro creado correctamente!", token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
};

export const updateClaus = async (req, res) => {
  try {
    await Claus.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "¡Registro actualizado correctamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClaus = async (req, res) => {
  try {
    await Claus.findByIdAndDelete(req.params.id);
    res.json({ message: "¡Registro eliminado correctamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
