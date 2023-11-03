import jwt from "jsonwebtoken";
import roles from "../models/Roles.model.js";

export const getAllRoles = async (req, res) => {
  try {
    const rolesList = await roles.find(); // Cambiado el nombre de la variable local a rolesList
    res.json(rolesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar si el id es un ObjectId válido
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID de rol no válido" });
    }

    const role = await roles.findOne({ _id: mongoose.Types.ObjectId(id) });

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { rol } = req.body; // No incluyas _id en el cuerpo de la solicitud
    const nuevoRol = new roles({ rol });
    await nuevoRol.save();

    // Generar un token para el nuevo rol
    const token = jwt.sign({ _id: nuevoRol._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: '¡Rol creado correctamente!', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, rol } = req.body;
    const updatedRole = await roles.findOneAndUpdate(
      { _id: id },
      { _id, rol },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.json({ message: '¡Rol actualizado correctamente!', updatedRole });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await roles.findOneAndDelete({ _id: id });

    if (!deletedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.json({ message: '¡Rol eliminado correctamente!', deletedRole });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
