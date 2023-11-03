import mongoose, { Schema, model } from 'mongoose';

const claseSchema = new mongoose.Schema({
    id_clase: {
        type: Number,
        required: true,
        unique: true,
    },
    valor: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
    duracion: {
        type: String,
        required: true,
    },
    metodo_pago: {
        type: String,
        required: true,
    },
    modalidad: {
        type: String,
        required: true,
    }
});

const Clase = mongoose.model('Clase', claseSchema);

export default Clase;
