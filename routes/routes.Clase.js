import express from 'express';
import { getAllClases, getClase, createClase, updateClase, deleteClase } from '../controllers/Control.Clase.js'; 

const routerClase = express.Router();

routerClase.get('/clase/', getAllClases);
routerClase.get('/clase/:id', getClase);
routerClase.post('/clase/', createClase);
routerClase.put('/clase/:id', updateClase);
routerClase.delete('/clase/:id', deleteClase);

export default routerClase;
