import mongoose, { Schema, model } from 'mongoose';

const rolSchema = new mongoose.Schema({

    rol: {
        type: String,
        required: true,
    }
});

const Rol = mongoose.model('roles', rolSchema);

export default Rol;
