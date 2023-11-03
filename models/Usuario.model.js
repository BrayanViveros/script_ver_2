import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({

   N_Identificacion: {
     type: Number,
     required: true,
     // unique: true,

    },
      NomCompleto: {
         type: String,
         required: true,
    },
      Estado_Usuario: {
        type: String,
        required: true,
     },
      Telefono: {
        type: Number,
        required: true,
     },
      Fec_Nacimiento:{
        type: String,
        require: true,
     },
      Ciudad:{
        type: String,
        required: false,
     },
      Correo: {
        type: String,
        required:false,
        unique: false,
     },
      Contraseña:{
        type: String,
        required: true,
     },
     Hoja_Vida: {
      type: String,
      required: false,
     },
     Id_User :{
      type: Number,
      required: false,
     },
    //  rol_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Roles',  // Referencia a la colección Roles
    //   required: false,}
  });
   
usuarioSchema.methods.encryptContrasena = async (contrasena) => {
    return bcrypt.hash(contrasena, 10);
  };


const Usuarios = mongoose.model('Usuarios', usuarioSchema);


export default Usuarios;