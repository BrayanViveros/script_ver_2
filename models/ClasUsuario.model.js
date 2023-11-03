import mongoose, { Schema, model } from 'mongoose';

const claseUsuarioSchema = new mongoose.Schema({
    clase_id: {
        type: Schema.Types.ObjectId,
        ref: 'Clase',  // Referencia a la colección Clase
        required: true,
    },
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',  // Referencia a la colección Usuarios
        required: true,
    },
    calificacion: {
        type: String,
        required: true,
    }
});

const ClaseUsuario = mongoose.model('Clase_Usuario', claseUsuarioSchema);

export default ClaseUsuario;
