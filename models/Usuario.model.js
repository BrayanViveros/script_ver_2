import mongoose from 'mongoose';

//Aqui tengo mi modelo de Usuarios 
const usuarioSchema = new mongoose.Schema({

    N_Identificacion: {
     type: Number,
     required: false,
     // unique: true,

    },
      NomCompleto: {
         type: String,
         required: true,
    },
    //   Estado_Usuario: {
    //     type: String,
    //     required: false,
    //  },
      Telefono: {
        type: Number,
        required: false,
     },
      Fec_Nacimiento:{
        type: String,
        required: false,
     },
      Ciudad:{
        type: String,
        required: false,
     },
      email: {
        type: String,
        required:true,
        unique: true,
     },
      password:{
        type: String,
        required: true,
     },
     Hoja_Vida: {
      type: String,
      required: false,
     }
    //  rol_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Roles',  // Referencia a la colección Roles
    //   required: false,}
  },
  {
    timestamps: true,
  }
  );
   
// usuarioSchema.methods.encryptContrasena = async (contrasena) => {
//     return bcrypt.hash(contrasena, 10);
//   };


const Usuarios = mongoose.model('Usuarios', usuarioSchema);


export default Usuarios;