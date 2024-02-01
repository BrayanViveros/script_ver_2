import mongoose from 'mongoose';

const resultadoClaseSchema = new mongoose.Schema({
   usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
  nombreUsuario: String,
  nombreProfesor: String,
  fechaHora: Date,
  lugar: String,
  precio: Number,

});

const ResultadoClase = mongoose.model('ResultadoClase', resultadoClaseSchema);

export default ResultadoClase;
