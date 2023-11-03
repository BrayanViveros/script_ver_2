import express from 'express';
import { getAllClaus, getClaus, createClaus, updateClaus, deleteClaus } from '../controllers/Control.Claus.js'; 
const routerClaus = express.Router();

routerClaus.get('/claus/', getAllClaus);
routerClaus.get('/claus/:id', getClaus);
routerClaus.post('/claus/', createClaus);
routerClaus.put('/claus/:id', updateClaus);
routerClaus.delete('/claus/:id', deleteClaus);

export default routerClaus;
