import ResultadoClase from "../models/ResultadoClase.model.js";
import Usuarios from "../models/Usuario.model.js";

export const guardarResultadoClase = async (req, res) => {
  try {
    const {
      nombreUsuario,
      nombreProfesor,
      fechaHora,
      lugar,
      precio,
    } = req.body;

    console.log(req.user);
    
    const usuarioId = req.user.id;
    const usuario = await Usuarios.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Crear un nuevo resultado de clase
     const nuevoResultado = new ResultadoClase({
      usuarioId: usuarioId,
      nombreUsuario: usuario.NomCompleto,
      nombreProfesor,
      fechaHora,
      lugar,
      precio,
    });

    // Guardar el resultado en la base de datos
    await nuevoResultado.save();

    res.status(201).json({ mensaje: 'Resultado de clase guardado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar el resultado de la clase' });
  }
};


